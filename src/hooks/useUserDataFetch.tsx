import { useQuery } from "@tanstack/react-query"
import { getSelfData } from "../http/apiCalls"

export const useUserDataFetch = (enabled ?: boolean) => {
  const { refetch : userDataFetch,data,isPending } = useQuery({
    queryKey: ["self"],
    queryFn: getSelfData,
    enabled: enabled ?? true,
  })

  return {
    userDataFetch,
    data,
    isPending
  }
}