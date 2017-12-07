defmodule Athena.Factory do
  use ExMachina.Ecto, repo: Athena.Repo

  def book_factory do
    {:ok, date} = Date.from_iso8601("2017-01-01")

    %Athena.Book{
      title: "Book title",
      author: "Book author",
      comment: "Book comment",
      cover: "Book cover",
      published_at: date,
      read_at: date
    }
  end

  def url_factory do
    %Athena.Url{ url: "http://www.url.com/" }
  end
end
