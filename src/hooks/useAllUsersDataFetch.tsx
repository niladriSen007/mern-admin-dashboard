import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { getAllUsers } from "../http/apiCalls"

export const useAllUsersDataFetch = (queryParams : {
  currentPage : number,
  limit : number
}) => {
  const {refetch : fetchAllUserData,data,isPending,isFetching,error} = useQuery({
    queryKey: ["allUsers",queryParams],
    queryFn: () => getAllUsers(queryParams.currentPage,queryParams.limit),
    placeholderData: keepPreviousData
  })

  return {
    data,
    fetchAllUserData,
    isPending,
    isFetching,
    error
  }
}