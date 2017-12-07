defmodule AthenaWeb.BookControllerTest do
  use AthenaWeb.ConnCase
  import Athena.Factory

  test "GET /books", %{conn: conn} do
    book = insert(:book)

    conn = get conn, book_path(conn, :index)

    assert json_response(conn, 200) == %{
      "books" => [%{
        "title" => book.title,
        "comment" => book.comment,
        "author" => book.author,
        "cover" => book.cover,
        "published_at" => Date.to_iso8601(book.published_at),
        "read_at" => Date.to_iso8601(book.read_at)
      }]
    }
  end

  test "POST /books", %{conn: conn} do
    params = %{
      "title" => "book title",
      "comment" => "book comment",
      "author" => "book author",
      "cover" => "book cover",
      "published_at" => "2015-01-01",
      "read_at" => "2017-01-01"
    }

    response =
      conn
      |> post(book_path(conn, :create), params)
      |> json_response(201)
  end
end
