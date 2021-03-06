defmodule AthenaWeb.BookControllerTest do
  use AthenaWeb.ConnCase
  import Athena.Factory
  import Mock

  test "GET /books", %{conn: conn} do
    book = insert(:book)

    conn = get conn, book_path(conn, :index, page: 1)

    assert json_response(conn, 200) == %{
      "books" => [%{
        "title" => book.title,
        "comment" => book.comment,
        "author" => book.author,
        "cover" => book.cover,
        "published_at" => Date.to_iso8601(book.published_at),
        "read_at" => Date.to_iso8601(book.read_at)
      }],
     "total" => 1
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

    conn |> post(book_path(conn, :create), params) |> json_response(201)
  end

  test "DELETE /books/:id", %{conn: conn} do
    url = insert(:book)

    conn |> delete(book_path(conn, :delete, url.id)) |> json_response(204)
  end

  test "GET /books/amazon", %{conn: conn} do
    params = %{ "url" => "http://www.amazon.com/bookurl" }
    response = %HTTPoison.Response{status_code: 200, body: '{}'}

    with_mock HTTPoison, [get: fn("http://www.amazon.com/bookurl") -> {:ok, response} end] do
      conn = get(conn, book_path(conn, :autocomplete), params)

      assert json_response(conn, 200) == %{
        "cover" => [],
        "title" => "",
        "description" => "",
        "author" => "",
        "published_at" => "",
      }
    end
  end
end
