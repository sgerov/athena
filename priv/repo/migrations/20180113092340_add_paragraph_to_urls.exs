defmodule Athena.Repo.Migrations.AddParagraphToUrls do
  use Ecto.Migration

  def change do
    alter table(:urls) do
      add :paragraph, :text
    end
  end
end
