defmodule Athena.Athena.Url do
  use Ecto.Schema
  import Ecto.Changeset
  alias Athena.Athena.Url


  schema "urls" do
    field :preview, :string
    field :read_time_seconds, :integer
    field :score, :integer
    field :summary, :string
    field :title, :string
    field :url, :string

    timestamps()
  end

  @doc false
  def changeset(%Url{} = url, attrs) do
    url
    |> cast(attrs, [:url, :preview, :title, :summary, :score, :read_time_seconds])
    |> validate_required([:url, :preview, :title, :summary, :score, :read_time_seconds])
  end
end
