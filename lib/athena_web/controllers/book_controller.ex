defmodule AthenaWeb.BookController do
  use AthenaWeb, :controller

  alias Athena.{Repo, Book}

  def index(conn, _params) do
    books = Repo.all(Book)
    render conn, books: books
  end

  def create(conn, %{"title" => title, "author" => author, "comment" => comment, "cover" => cover, "published_at" => published_at_str, "read_at" => read_at_str}) do
    {:ok, read_at} = Date.from_iso8601(read_at_str)
    {:ok, published_at} = Date.from_iso8601(published_at_str)

    b = %Book{title: title, author: author, comment: comment, cover: cover, published_at: published_at, read_at: read_at}
    Repo.insert(b)

    conn |> put_status(:created) |> json(%{})
  end
end
