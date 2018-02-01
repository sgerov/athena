defmodule Athena.Tasks do  
  def migrate do
    {:ok, _} = Application.ensure_all_started(:athena)

    path = Application.app_dir(:athena, "priv/repo/migrations")

    Ecto.Migrator.run(Athena.Repo, path, :up, all: true)
  end
end  
