import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { getAllCategoreis } from "../http/apiCalls"

export const useCategoriesFetch = ()=>{
  const {data,isFetching} = useQuery({
    queryKey: ["categories"],
    queryFn:getAllCategoreis,
    placeholderData: keepPreviousData
  })

  return {
    data,
    isFetching
  }
}