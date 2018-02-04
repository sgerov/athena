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
    pipe_through :browser 

    get "/", PageController, :index
  end

  scope "/api", AthenaWeb do
    pipe_through :api

    scope "/" do
      pipe_through :authorized

      resources "/books", BookController, only: [:create, :delete]

      resources "/urls", UrlController, only: [:create, :delete]
    end

    resources "/books", BookController, only: [:index]
    get "/books/autocomplete", BookController, :autocomplete
    get "/books/graph", BookController, :graph

    resources "/urls", UrlController, only: [:index]
    get "/urls/autocomplete", UrlController, :autocomplete
    get "/urls/graph", UrlController, :graph

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
