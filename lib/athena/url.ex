defmodule Athena.Url do
  use Ecto.Schema
  import Ecto.Changeset
  alias Athena.Url


  schema "urls" do
    field :url, :string
    field :preview, :string
    field :title, :string
    field :summary, :string
    field :score, :integer
    field :read_time_seconds, :integer

    timestamps()
  end

  @doc false
  def changeset(%Url{} = url, attrs) do
    url
    |> cast(attrs, [:url, :preview, :title, :summary, :score, :read_time_seconds])
    |> validate_required([:url, :preview, :title])
  end
end
