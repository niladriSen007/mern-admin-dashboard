import { useQuery } from "@tanstack/react-query"
import { getSelfData } from "../http/apiCalls"

export const useUserDataFetch = () => {
  const { refetch : userDataFetch } = useQuery({
    queryKey: ["self"],
    queryFn: getSelfData,
    enabled: false,
  })

  return {
    userDataFetch,
  }
}