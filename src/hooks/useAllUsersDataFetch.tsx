import { useQuery } from "@tanstack/react-query"
import { getAllUsers } from "../http/apiCalls"

export const useAllUsersDataFetch = () => {
  const {refetch : fetchAllUserData,data,isPending} = useQuery({
    queryKey: ["allUsers"],
    queryFn: getAllUsers,
  })

  return {
    data,
    fetchAllUserData,
    isPending
  }
}