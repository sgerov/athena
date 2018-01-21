defmodule AthenaWeb.UserController do
  use AthenaWeb, :controller

  def sign_in(conn, %{"password" => password}) do
    if password != System.get_env("ADMIN_PASSWORD") do
      send_resp(conn, 401, Poison.encode!(%{error: "Incorrect password"}))
    end

    user = %{id: "admin"}

    conn
    |> Athena.Guardian.Plug.sign_in(user)
    |> send_resp(204, "")
  end

  def sign_out(conn, _params) do
    conn
    |> Athena.Guardian.Plug.sign_out()
    |> send_resp(204, "")
  end

  def show(conn, params) do
    user = Athena.Guardian.Plug.current_resource(conn)

    send_resp(conn, 200, Poison.encode!(%{user: user}))
  end
end
