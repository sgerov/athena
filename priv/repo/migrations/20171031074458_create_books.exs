defmodule Athena.Repo.Migrations.CreateBooks do
  use Ecto.Migration

  def change do
    create table(:books) do
      add :cover, :string
      add :title, :string
      add :author, :string
      add :published_at, :date
      add :read_at, :date
      add :comment, :text

      timestamps()
    end

  end
end
