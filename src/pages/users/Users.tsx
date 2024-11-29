import { Table } from "antd"
import { lazy, Suspense } from "react"
import { useAllUsersDataFetch } from "../../hooks/useAllUsersDataFetch"
import { columns } from "./utils/Columns"
import Fallback from "../../components/common/Fallback"
import { useAuthStore } from "../../store/store"
import { Navigate } from "react-router-dom"
const UserFilter = lazy(() => import("./_components/UserFilter"))
const BreadCrumb = lazy(() => import("./_components/BreadCrumb"))

const Users = () => {
  const { data } = useAllUsersDataFetch()
  const { user } = useAuthStore()
  if (user?.roles !== "ADMIN") return <Navigate to="/" replace={true} />
  return (
    <Suspense fallback={<Fallback label={"User data"} />}>
      <BreadCrumb />
      <UserFilter
        onFilterChange={(filterName, filterValue) => {
          console.log(filterName, filterValue)
        }}
      />
      <Table
      rowKey={"id"}
        pagination={{
          position: ["bottomRight"],
          pageSize: 6,
        }}
        columns={columns}
        dataSource={data?.data?.users}
      />
    </Suspense>
  )
}
export default Users
