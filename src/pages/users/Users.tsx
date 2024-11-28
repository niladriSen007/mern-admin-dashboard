import { Table } from "antd"
import { lazy, Suspense } from "react"
import { useAllUsersDataFetch } from "../../hooks/useAllUsersDataFetch"
import { columns } from "./utils/Columns"
import Fallback from "../../components/common/Fallback"
const BreadCrumb = lazy(() => import("./_components/BreadCrumb"))

const Users = () => {
  const { data } = useAllUsersDataFetch()
  console.log(data?.data?.users)
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
