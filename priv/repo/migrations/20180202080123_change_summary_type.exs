defmodule Athena.Repo.Migrations.ChangeSummaryType do
  use Ecto.Migration

  def change do
    alter table(:urls) do
      modify :summary, :text
    end
  end
end
