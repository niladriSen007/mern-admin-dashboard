import Icon from "@ant-design/icons"
import { Button, Form, Modal, Space, Table } from "antd"
import { lazy, Suspense, useState } from "react"
import { Navigate } from "react-router-dom"
import Fallback from "../../components/common/Fallback"
import Vector from "../../components/icons/Vector"
import { useAllUsersDataFetch } from "../../hooks/useAllUsersDataFetch"
import { useCreateUser } from "../../hooks/useCreateUser"
import { useAuthStore } from "../../store/store"
import { columns } from "./utils/Columns"
const CreateUserForm = lazy(() => import("./_components/forms/CreateUserForm"))
const UserFilter = lazy(() => import("./_components/UserFilter"))
const BreadCrumb = lazy(() => import("./_components/BreadCrumb"))

const Users = () => {
  const { data } = useAllUsersDataFetch()
  const { user } = useAuthStore()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const { createUserMutation } = useCreateUser()

  const handleCreateUser = async () => {
    try {
      await form.validateFields()
      createUserMutation(form.getFieldsValue())
     /*  queryClient.invalidateQueries({
        queryKey: ["allUsers"],
      }) */
    } catch (error: unknown) {
      throw new Error(error as string)
    } finally {
      form.resetFields()
      setOpen(!open)
    }
  }

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
      <Modal
        style={{
          top: "5%",
        }}
        width={"800px"}
        height={"600px"}
        title={
          <Space
            style={{
              margin: "16px 0",
              fontSize: "20px",
            }}
          >
            User form
          </Space>
        }
        footer={
          <Space
            align="center"
            style={{
              marginTop: "16px",
            }}
          >
            <Button
              onClick={() => {
                form.resetFields()
                setOpen(false)
              }}
            >
              Cancel
            </Button>
            <Button
              icon={<Icon size={32} component={Vector} />}
              type="primary"
              onClick={handleCreateUser}
            >
              Save
            </Button>
          </Space>
        }
        loading={loading}
        open={open}
        onCancel={() => setOpen(!open)}
      >
        <Form layout="vertical" form={form}>
          <CreateUserForm />
        </Form>
      </Modal>
    </Suspense>
  )
}
export default Users
