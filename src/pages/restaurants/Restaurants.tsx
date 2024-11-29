import { Button, Table } from "antd"
import { lazy, Suspense, useState } from "react"
import { Navigate } from "react-router-dom"
import Fallback from "../../components/common/Fallback"
import { useAuthStore } from "../../store/store"

import { columns } from "./utils/Columns"
import { useAllRestaurantsDataFetch } from "../../hooks/useAllRestaurantsDataFetch"
/* const CreateRestaurantDrawer = lazy(() => import("./_components/CreateRestaurantDrawer")) */
const CreateRestaurantModal = lazy(() => import("./_components/CreateRestaurantModal"))
const RestaurantFilter = lazy(() => import("./_components/RestaurantFilter"))
const BreadCrumb = lazy(() => import("./_components/BreadCrumb"))

const Restaurants = () => {
  const { user } = useAuthStore()
  const {data} = useAllRestaurantsDataFetch()
  console.log(data?.data?.tenants)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  if (user?.roles !== "ADMIN") return <Navigate to="/" replace={true} />
  return (
    <Suspense fallback={<Fallback label={"Restaurant data"} />}>
      <BreadCrumb />
      <RestaurantFilter
        onFilterChange={(filterName, filterValue) => {
          console.log(filterName, filterValue)
        }}
      >
        <Button
          type="primary"
          onClick={() => {
            setLoading(true)
            setOpen(true)
            setTimeout(() => {
              setLoading(false)
            }, 2000)
          }}
        >
          + Create Restaurant
        </Button>
      </RestaurantFilter>
      <Table
        rowKey={"id"}
        pagination={{
          position: ["bottomRight"],
          pageSize: 6,
        }}
        columns={columns}
        dataSource={data?.data?.tenants}
      />
      {/*       <CreateRestaurantDrawer {...{ open, setOpen }} />
       */}{" "}
      <CreateRestaurantModal {...{ open, setOpen, loading }}>
        <Button type="primary" onClick={() => setOpen(!open)}>
          Submit
        </Button>
      </CreateRestaurantModal>
    </Suspense>
  )
}
export default Restaurants
