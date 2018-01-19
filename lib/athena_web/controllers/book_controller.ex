defmodule AthenaWeb.BookController do
  use AthenaWeb, :controller

  alias Athena.{Repo, Book}

  def index(conn, %{"page" => page}) do
    books = paginated(Book, page, 5, :read_at)
    total = Repo.aggregate(Book, :count, :id)

    render conn, books: books, total: total
  end

  def create(conn, %{"title" => title, "author" => author, "comment" => comment, "cover" => cover, "published_at" => published_at_str, "read_at" => read_at_str}) do
    {:ok, read_at} = Date.from_iso8601(read_at_str)
    {:ok, published_at} = Date.from_iso8601(published_at_str)

    b = %Book{title: title, author: author, comment: comment, cover: cover, published_at: published_at, read_at: read_at}
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
end
