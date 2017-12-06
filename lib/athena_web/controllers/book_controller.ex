defmodule AthenaWeb.BookController do
  use AthenaWeb, :controller

  alias Athena.{Repo, Book}

  def index(conn, _params) do
    books = Repo.all(Book)
    render conn, books: books
  end
end
