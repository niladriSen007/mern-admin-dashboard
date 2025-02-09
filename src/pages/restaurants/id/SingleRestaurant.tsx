import { useParams } from "react-router-dom"

import Diagram from "./_components/Diagram"
import { useSingleRestaurantDataFetch } from "../../../hooks"

const SingleRestaurant = () => {
  const data = useParams<{ id: string }>()

  const { tenantData } = useSingleRestaurantDataFetch(data?.id as string)
/*   //console.log(tenantData?.users) */

  return <div>{tenantData && <Diagram tenantData={tenantData} />}</div>
}
export default SingleRestaurant
