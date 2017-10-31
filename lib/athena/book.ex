defmodule Athena.Book do
  use Ecto.Schema
  import Ecto.Changeset
  alias Athena.Book


  schema "books" do
    field :author, :string
    field :comment, :string
    field :cover, :string
    field :published_at, :date
    field :read_at, :date
    field :title, :string

    timestamps()
  end

  @doc false
  def changeset(%Book{} = book, attrs) do
    book
    |> cast(attrs, [:cover, :title, :author, :published_at, :read_at, :comment])
    |> validate_required([:cover, :title, :author, :published_at, :read_at, :comment])
  end
end
