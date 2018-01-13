defmodule AthenaWeb.UrlView do
  use AthenaWeb, :view

  def render("index.json", %{urls: urls, total: total}) do
    %{
      urls: Enum.map(urls, &url_json/1),
      total: total
    }
  end

  def url_json(url) do
    %{
      url: url.url,
      inserted_at: url.inserted_at,
      preview: url.preview,
      paragraph: url.paragraph,
      summary: url.summary,
      title: url.title
    }
  end
end
