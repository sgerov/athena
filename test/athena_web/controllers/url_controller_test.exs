defmodule AthenaWeb.UrlControllerTest do
  use AthenaWeb.ConnCase
  import Athena.Factory

  test "GET /urls", %{conn: conn} do
    url = insert(:url)

    conn = get conn, url_path(conn, :index)

    assert json_response(conn, 200) == %{
      "urls" => [%{
        "url" => url.url,
        "inserted_at" => NaiveDateTime.to_iso8601(url.inserted_at),
      }]
    }
  end

  test "POST /urls", %{conn: conn} do
    params = %{ "url" => "http://www.url.com" }

    response =
      conn
      |> post(url_path(conn, :create), params)
      |> json_response(201)
  end
end
