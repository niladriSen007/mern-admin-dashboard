import { useQuery } from "@tanstack/react-query"
import { getAllTenants } from "../http/apiCalls"

export const useAllRestaurantsDataFetch = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["allTenants"],
    queryFn: getAllTenants,
  })

  return {
    data,
    isPending,
    error,
  }
}
