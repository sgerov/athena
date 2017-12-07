defmodule AthenaWeb.UrlController do
  use AthenaWeb, :controller

  alias Athena.{Repo, Url}

  def index(conn, _params) do
    urls = Repo.all(Url)
    render conn, urls: urls
  end

  def create(conn, %{"url" => url }) do
    u = %Url{url: url}
    Repo.insert(u)

    conn |> put_status(:created) |> json(%{})
  end
end
