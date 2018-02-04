defmodule AthenaWeb.UrlView do
  use AthenaWeb, :view

  def render("index.json", %{urls: urls, total: total}) do
    %{
      urls: Enum.map(urls, &url_json/1),
      total: total
    }
  end

  def render("graph.json", %{data: data}) do
    Enum.map(data, &month_json/1)
  end

  def url_json(url) do
    %{
      id: url.id,
      url: url.url,
      inserted_at: url.inserted_at,
      preview: url.preview,
      paragraph: url.paragraph,
      summary: url.summary,
      title: url.title,
      score: url.score
    }
  end

  def month_json(data) do
    %{
      day: data.day,
      score: data.score,
      urls: data.urls,
    }
  end
end
