import { useParams } from "react-router-dom"
import { useSingleRestaurantDataFetch } from "../../../hooks/useSingleRestaurantDataFetch"

const SingleRestaurant = () => {
  const data = useParams<{ id: string }>()

  const { tenantData } = useSingleRestaurantDataFetch(data?.id as string)

  return (
    <div>
      {tenantData && (
        <div>
          <h1>{tenantData?.name}</h1>
          <h2>{tenantData?.address}</h2>
        </div>
      )}
    </div>
  )
}
export default SingleRestaurant
