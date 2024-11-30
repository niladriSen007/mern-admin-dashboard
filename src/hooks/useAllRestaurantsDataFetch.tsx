import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { getAllTenants } from "../http/apiCalls"

export const useAllRestaurantsDataFetch = (queryParams: {
  currentPage: number
  limit: number
  q: string
}) => {
  const { data, isPending,isFetching, error,refetch : fetchAllRestaurantData } = useQuery({
    queryKey: ["allTenants",queryParams],
    queryFn:()=> getAllTenants(
      queryParams.currentPage,
        queryParams.limit,
        queryParams.q
    ),
    placeholderData: keepPreviousData
  })

  return {
    fetchAllRestaurantData,
    data,
    isPending,
    error,
    isFetching
  }
}
