import { Button, Table } from "antd"
import { lazy, Suspense, useState } from "react"
import { Navigate } from "react-router-dom"
import Fallback from "../../components/common/Fallback"
import { useAllUsersDataFetch } from "../../hooks/useAllUsersDataFetch"
import { useAuthStore } from "../../store/store"

import { columns } from "./utils/Columns"
/* const CreateUserDrawer = lazy(() => import("./_components/CreateUserDrawer")) */
const CreateUserModal = lazy(() => import("./_components/CreateUserModal"))
const UserFilter = lazy(() => import("./_components/UserFilter"))
const BreadCrumb = lazy(() => import("./_components/BreadCrumb"))

const Users = () => {
  const { data } = useAllUsersDataFetch()
  const { user } = useAuthStore()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  if (user?.roles !== "ADMIN") return <Navigate to="/" replace={true} />
  return (
    <Suspense fallback={<Fallback label={"User data"} />}>
      <BreadCrumb />
      <UserFilter
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
          + Create User
        </Button>
      </UserFilter>
      <Table
        rowKey={"id"}
        pagination={{
          position: ["bottomRight"],
          pageSize: 6,
        }}
        columns={columns}
        dataSource={data?.data?.users}
      />
      {/*       <CreateUserDrawer {...{ open, setOpen }} />
       */}{" "}
      <CreateUserModal {...{ open, setOpen, loading }}>
        <Button type="primary" onClick={() => setOpen(!open)}>
          Submit
        </Button>
      </CreateUserModal>
    </Suspense>
  )
}
export default Users
