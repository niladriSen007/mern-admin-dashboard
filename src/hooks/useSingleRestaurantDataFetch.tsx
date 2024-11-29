import { useQuery } from "@tanstack/react-query"
import { getSingleTenant } from "../http/apiCalls"
import { useEffect, useState } from "react"
import { RestaurantDataType } from "../pages/restaurants/types"

export const useSingleRestaurantDataFetch = (id: string) => {
  const [tenantData, setTenantData] = useState<RestaurantDataType>()
  const { refetch: restaurantDataFetch } = useQuery({
    queryKey: ["singleRestaurant", id],
    queryFn: async () => {
      const res = await getSingleTenant(id)
      if (res.status === 200) {
        return res.data
      }
      throw new Error("Error fetching restaurant data")
    },
    enabled: false,
  })

  useEffect(() => {
    const fetchRestaurantData = async () => {
      const promise = await restaurantDataFetch()
      setTenantData(promise?.data?.tenant)
    }
    fetchRestaurantData()
  }, [restaurantDataFetch])

  return { tenantData }
}
