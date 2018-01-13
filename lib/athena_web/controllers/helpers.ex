defmodule AthenaWeb.Controllers.Helpers do
  import Ecto.Query, only: [from: 2]

  def paginated(query, page, size, order) do
    Athena.Repo.all(from query,
                    order_by: [desc: ^order],
                    limit: ^size,
                    offset: ^((String.to_integer(page)-1) * size)
    )
  end
end
