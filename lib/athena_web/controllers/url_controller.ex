defmodule AthenaWeb.UrlController do
  use AthenaWeb, :controller

  import Ecto.Query, only: [from: 2]

  alias Athena.{Repo, Url}

  def index(conn, %{"page" => page}) do
    urls = paginated(Url, page, 5)

    render conn, urls: urls
  end

  def create(conn, %{"url" => url, "preview" => preview, "title" => title }) do
    u = Url.changeset(%Url{}, %{url: url, preview: preview, title: title})
    Repo.insert!(u)

    conn |> put_status(:created) |> json(%{})
  end

  def autocomplete(conn, %{"url" => url }) do
    case HTTPoison.get(url) do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
        title = body |> Floki.find("title") |> Floki.text
        images = body |> Floki.attribute("img", "src")

        conn |> put_status(200) |> json(%{
          title: title,
          images: images
        })
      {:ok, %HTTPoison.Response{status_code: status_code}} ->
        conn |> put_status(status_code) |> json(%{})
      {:error, %HTTPoison.Error{reason: reason}} ->
        conn |> put_status(400) |> json(%{error: reason})
    end
  end
end
