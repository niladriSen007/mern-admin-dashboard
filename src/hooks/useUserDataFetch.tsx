import { useQuery } from "@tanstack/react-query"
import { getSelfData } from "../http/apiCalls"
import { AxiosError } from "axios"

export const useUserDataFetch = (enabled ?: boolean) => {
  const { refetch : userDataFetch,data,isPending } = useQuery({
    queryKey: ["self"],
    queryFn: getSelfData,
    enabled: enabled ?? true,
    retry: (failureCount, error) => {
      if (error instanceof AxiosError && error?.response?.status === 401) {
        return false
      }
      return failureCount < 3
    }
  })

  return {
    userDataFetch,
    data,
    isPending
  }
}