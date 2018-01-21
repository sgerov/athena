defmodule AthenaWeb.Router do
  use AthenaWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :unauthorized do
    plug :fetch_session
  end

  pipeline :authorized do
    plug :fetch_session
    plug Guardian.Plug.Pipeline, module: Athena.Guardian,
      error_handler: Athena.AuthErrorHandler
    plug Guardian.Plug.VerifySession
    plug Guardian.Plug.LoadResource
  end

  scope "/", AthenaWeb do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
  end

  # Other scopes may use custom stacks.
  scope "/api", AthenaWeb do
    pipe_through :api

    resources "/books", BookController, only: [:index, :create, :delete]
    get "/books/autocomplete", BookController, :autocomplete

    resources "/urls", UrlController, only: [:index, :create, :delete]
    get "/urls/autocomplete", UrlController, :autocomplete

    scope "/users" do
      scope "/" do
        pipe_through :unauthorized

        post "/sign-in", UserController, :sign_in
      end

      scope "/" do
        pipe_through :authorized

        post "/sign-out", UserController, :sign_out
        get "/me", UserController, :show
      end
    end
  end
end
