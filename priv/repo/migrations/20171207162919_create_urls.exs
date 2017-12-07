defmodule Athena.Repo.Migrations.CreateUrls do
  use Ecto.Migration

  def change do
    create table(:urls) do
      add :url, :string
      add :preview, :string
      add :title, :string
      add :summary, :string
      add :score, :integer
      add :read_time_seconds, :integer

      timestamps()
    end

  end
end
