defmodule AthenaWeb.UrlView do
  use AthenaWeb, :view

  def render("index.json", %{urls: urls}) do
    %{
      urls: Enum.map(urls, &url_json/1)
    }
  end

  def url_json(url) do
    %{
      url: url.url,
      inserted_at: url.inserted_at,
      preview: url.preview,
      title: url.title
    }
  end
end
