import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { getAllUsers } from "../http/apiCalls"

export const useAllUsersDataFetch = (queryParams: {
  currentPage: number
  limit: number
  q: string
  role: string
}) => {
  const {
    refetch: fetchAllUserData,
    data,
    isPending,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["allUsers", queryParams],
    queryFn: () =>
      getAllUsers(
        queryParams.currentPage,
        queryParams.limit,
        queryParams.q,
        queryParams.role
      ),
    placeholderData: keepPreviousData,
  })

  return {
    data,
    fetchAllUserData,
    isPending,
    isFetching,
    error,
  }
}
