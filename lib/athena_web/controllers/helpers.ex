defmodule AthenaWeb.Controllers.Helpers do
  import Ecto.Query, only: [from: 2]

  def paginated(query, page, size) do
    Athena.Repo.all(from query,
      limit: ^size,
      offset: ^((String.to_integer(page)-1) * size)
    )
  end
end
