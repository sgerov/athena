defmodule AthenaWeb.UrlControllerTest do
  use AthenaWeb.ConnCase
  import Athena.Factory
  import Mock

  test "GET /urls", %{conn: conn} do
    url = insert(:url)

    conn = get conn, url_path(conn, :index, page: 1)

    assert json_response(conn, 200) == %{
      "urls" => [%{
        "paragraph" => url.paragraph,
        "score" => url.score,
        "summary" => url.summary,
        "url" => url.url,
        "preview" => url.preview,
        "title" => url.title,
        "inserted_at" => NaiveDateTime.to_iso8601(url.inserted_at),
      }],
      "total" => 1
    }
  end

  test "POST /urls", %{conn: conn} do
    params = %{ "url" => "http://www.url.com", "preview" => "http://url.com/ha.img", "title" => "Latest article", "paragraph" => "this is the first paragraph", "score" => "50", "summary" => "Summaryyy!" }

    conn |> post(url_path(conn, :create), params) |> json_response(201)
  end

  test "GET /urls/autocomplete", %{conn: conn} do
    params = %{ "url" => "http://www.url.com" }
    response = %HTTPoison.Response{status_code: 200, body: '{}'}

    with_mock HTTPoison, [get: fn("http://www.url.com") -> {:ok, response} end] do
      conn = get(conn, url_path(conn, :autocomplete), params)

      assert json_response(conn, 200) == %{
        "images" => [],
        "title" => "",
        "paragraph" => ""
      }
    end
  end
end
