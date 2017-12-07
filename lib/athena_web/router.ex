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

  scope "/", AthenaWeb do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
  end

  # Other scopes may use custom stacks.
  scope "/api", AthenaWeb do
    pipe_through :api

    resources "/books", BookController, only: [:index, :create]
    resources "/urls", UrlController, only: [:index, :create]
  end
end
