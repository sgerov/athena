defmodule AthenaWeb.UrlController do
  use AthenaWeb, :controller

  import Ecto.Query, only: [from: 2]

  alias Athena.{Repo, Url}

  def index(conn, %{"page" => page}) do
    urls = paginated(Url, page, 5)
    total = Repo.aggregate(Url, :count, :id)

    render conn, urls: urls, total: total
  end

  def create(conn, %{"url" => url, "preview" => preview, "title" => title, "paragraph" => paragraph }) do
    u = Url.changeset(%Url{}, %{url: url, preview: preview, title: title, paragraph: paragraph})
    Repo.insert!(u)

    conn |> put_status(:created) |> json(%{})
  end

  def autocomplete(conn, %{"url" => url }) do
    case HTTPoison.get(url) do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
        title = body |> Floki.find("title") |> Floki.text
        images = body |> Floki.attribute("img", "src")
        paragraph = body |> Floki.find("p") |> Floki.text

        conn |> put_status(200) |> json(%{
          title: title,
          images: images,
          paragraph: paragraph
        })
      {:ok, %HTTPoison.Response{status_code: status_code}} ->
        conn |> put_status(status_code) |> json(%{})
      {:error, %HTTPoison.Error{reason: reason}} ->
        conn |> put_status(400) |> json(%{error: reason})
    end
  end
end
