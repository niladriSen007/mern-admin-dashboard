import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { getAllProducts } from "../http/apiCalls"

export const useAllProductsDataFetch = (queryParams: {
  currentPage: number,
  limit: number,
  q: string,
  tenantId: string,
  categoryId: string,
  isPublished: boolean | undefined,
}) => {
  const {
    refetch: fetchAllProductData,
    data,
    isPending,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["allProducts", queryParams],
    queryFn: () =>
      getAllProducts(
        queryParams.currentPage,
        queryParams.limit,
        queryParams.q,
        queryParams.tenantId,
        queryParams.categoryId,
        queryParams.isPublished
      ),
    placeholderData: keepPreviousData,
  })

  return {
    data,
    fetchAllProductData,
    isPending,
    isFetching,
    error,
  }
}