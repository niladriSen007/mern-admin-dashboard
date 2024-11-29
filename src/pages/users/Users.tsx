import { Table } from "antd"
import { lazy, Suspense } from "react"
import { useAllUsersDataFetch } from "../../hooks/useAllUsersDataFetch"
import { columns } from "./utils/Columns"
import Fallback from "../../components/common/Fallback"
import { useAuthStore } from "../../store/store"
import { Navigate } from "react-router-dom"
const BreadCrumb = lazy(() => import("./_components/BreadCrumb"))

const Users = () => {
  const { data } = useAllUsersDataFetch()
  const {user} = useAuthStore()
  if(user?.roles !== 'ADMIN') return <Navigate to="/" replace={true} />
  return (
    <Suspense fallback={<Fallback label={"User data"}/>}>
      <BreadCrumb />
      <Table pagination={{
        position: ["bottomRight"],
        pageSize: 6,
      }} columns={columns} dataSource={data?.data?.users} />
    </Suspense>
  )
}
export default Users
