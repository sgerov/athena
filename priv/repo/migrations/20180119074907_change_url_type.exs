defmodule Athena.Repo.Migrations.ChangeUrlType do
  use Ecto.Migration

  def change do
    alter table(:urls) do
        modify :url, :text
    end
  end
end
