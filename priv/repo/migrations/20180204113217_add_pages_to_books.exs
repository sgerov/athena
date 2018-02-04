defmodule Athena.Repo.Migrations.AddPagesToBooks do
  use Ecto.Migration

  def change do
    alter table(:books) do
      add :pages, :integer, default: 0
    end
  end
end
