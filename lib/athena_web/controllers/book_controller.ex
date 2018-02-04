defmodule AthenaWeb.BookController do
  use AthenaWeb, :controller
  import Ecto.Query, only: [from: 2]

  alias Athena.{Repo, Book}

  def index(conn, %{"page" => page}) do
    books = paginated(Book, page, 5, :read_at)
    total = Repo.aggregate(Book, :count, :id)

    render conn, books: books, total: total
  end

  def create(conn, %{"title" => title, "author" => author, "comment" => comment, "cover" => cover, "published_at" => published_at_str, "read_at" => read_at_str, "pages" => pages}) do
    {:ok, read_at} = Date.from_iso8601(read_at_str)
    {:ok, published_at} = Date.from_iso8601(published_at_str)
    { pages, _ } = pages |> Integer.parse

    b = %Book{title: title, author: author, comment: comment, cover: cover, published_at: published_at, read_at: read_at, pages: pages}
    Repo.insert(b)

    conn |> put_status(:created) |> json(%{})
  end

  def delete(conn, %{"id" => id}) do
    Book |> Repo.get(id) |> Repo.delete!

    conn |> put_status(204) |> json(%{})
  end

  def autocomplete(conn, %{"url" => url }) do
    case HTTPoison.get(url) do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
        title = body |> Floki.find("#productTitle") |> Floki.text

        pages = case body |> Floki.find("#detail_bullets_id ul li:first-of-type") |> Floki.text |> String.replace(~r/[^\d]/, "") |> Integer.parse do
          { res, _ } ->
            res
          { :error } ->
            "0"
        end

        author = body |> Floki.find(".contributorNameID") |> Floki.text
        published_at = body |> Floki.find("#booksTitle span.a-text-normal:last-of-type") |> Floki.text
        description = body |> Floki.find("#bookDescription_feature_div noscript div") |> Floki.text
        cover =
          case body |> Floki.attribute("#imageBlock img", "data-a-dynamic-image") |> Poison.decode do
            { :ok, cover } ->
              cover |> Map.keys |> List.first
            { :error, _, _ } ->
              []
          end

        conn |> put_status(200) |> json(%{
          title: title,
          pages: pages,
          cover: cover,
          author: author,
          published_at: published_at,
          description: description
        })
      {:ok, %HTTPoison.Response{status_code: status_code}} ->
        conn |> put_status(status_code) |> json(%{})
      {:error, %HTTPoison.Error{reason: reason}} ->
        conn |> put_status(400) |> json(%{error: reason})
    end
  end

  def graph(conn, _params) do
    query = from b in Book,
      where: b.read_at > ago(6, "month"),
      order_by: fragment("date_part('month', ?)", b.read_at),
      group_by: fragment("date_part('month', ?)", b.read_at),
      select: %{month: fragment("date_part('month', ?)", b.read_at), books: count(b.id), pages: fragment("?::integer", avg(b.pages))}

    render conn, data: Repo.all(query)
  end
end
