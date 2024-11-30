import Icon, { LoadingOutlined } from "@ant-design/icons"
import { Alert, Button, Flex, Form, Modal, Space, Spin, Table } from "antd"
import { debounce } from "lodash"
import { lazy, Suspense, useMemo, useState } from "react"
import { Navigate } from "react-router-dom"
import Fallback from "../../components/common/Fallback"
import Vector from "../../components/icons/Vector"
import { PaginationResultLimit } from "../../constants/Constants"
import { useAllUsersDataFetch } from "../../hooks/useAllUsersDataFetch"
import { useCreateUser } from "../../hooks/useCreateUser"
import { useAuthStore } from "../../store/store"
import { FileldData } from "./types"
import { columns } from "./utils/Columns"
const CreateUserForm = lazy(() => import("./_components/forms/CreateUserForm"))
const UserFilter = lazy(() => import("./_components/UserFilter"))
const BreadCrumb = lazy(() => import("./_components/BreadCrumb"))

const Users = () => {
  const { user } = useAuthStore()
  const { createUserMutation } = useCreateUser()

  const [form] = Form.useForm()
  const [filterForm] = Form.useForm()
  
  const [queryParams, setQueryParams] = useState({
    currentPage: 1,
    limit: 6,
    q: "",
    role: "",
  })
  const { data, isFetching, error } = useAllUsersDataFetch(queryParams)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)


  const handleCreateUser = async () => {
    try {
      await form.validateFields()
      createUserMutation(form.getFieldsValue())
    } catch (error: unknown) {
      throw new Error(error as string)
    } finally {
      form.resetFields()
      setOpen(!open)
    }
  }

  const debouncedQUpdate = useMemo(() => {
    return debounce((value: string | undefined) => {
      setQueryParams((prev) => ({ ...prev, q: value ?? "", currentPage: 1 }))
    }, 1000)
  }, [])

  const onFilterChange = (filteredData: FileldData[]) => {
    const changedFields = filteredData
      ?.map((field) => ({
        [field.name[0]]: field.value,
      }))
      .reduce((acc, curr) => ({ ...acc, ...curr }), {})
    // console.log(changedFields)

    if ("q" in changedFields) {
      debouncedQUpdate(changedFields.q)
    } else {
      setQueryParams((prev) => ({
        ...prev,
        ...changedFields,
        currentPage: 1,
      }))
    }
  }

  if (user?.roles !== "ADMIN") return <Navigate to="/" replace={true} />

  return (
    <Suspense fallback={<Fallback label={"User data"} />}>
      <Flex justify="space-between">
        <BreadCrumb />
        {isFetching && <Spin indicator={<LoadingOutlined size={48} />} />}
        {error && (
          <Alert
            type="error"
            showIcon
            closable
            message={error?.message}
            banner={true}
          />
        )}
      </Flex>
      <Form form={filterForm} onFieldsChange={onFilterChange}>
        <UserFilter>
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
      </Form>
      <Table
        rowKey={"id"}
        pagination={{
          position: ["bottomRight"],
          pageSize: PaginationResultLimit,
          current: queryParams.currentPage,
          total: data?.data?.count,
          onChange: (page) => {
            setQueryParams((prev) => ({
              ...prev,
              currentPage: Number(page),
            }))
          },
        }}
        columns={columns}
        dataSource={data?.data?.users}
      />
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
