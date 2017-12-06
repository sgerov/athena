defmodule AthenaWeb.BookView do
  use AthenaWeb, :view

  def render("index.json", %{books: books}) do
    %{
      books: Enum.map(books, &book_json/1)
    }
  end

  def book_json(book) do
    %{
      cover: book.cover,
      title: book.title,
      author: book.author,
      comment: book.comment,
      published_at: book.published_at,
      read_at: book.read_at,
    }
  end
end
