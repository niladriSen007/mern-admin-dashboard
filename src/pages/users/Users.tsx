import Icon, {
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
} from "@ant-design/icons"
import { Alert, Button, Flex, Form, Modal, Space, Spin, Table } from "antd"
import { debounce } from "lodash"
import { lazy, Suspense, useEffect, useMemo, useState } from "react"
import { Navigate } from "react-router-dom"
import Fallback from "../../components/common/Fallback"
import Vector from "../../components/icons/Vector"
import { PaginationResultLimitForUser } from "../../constants/Constants"
import { useAllUsersDataFetch } from "../../hooks/useAllUsersDataFetch"
import { useCreateUser } from "../../hooks/useCreateUser"
import { useAuthStore } from "../../store/store"
import { DataType, FileldData } from "./types"
import { columns } from "./utils/Columns"
import { useUpdateUser } from "../../hooks/useUpdateUser"
import { useDeleteUser } from "../../hooks/useDeleteUser"
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
  const [currentEditingUser, setCurrentEditingUser] = useState<DataType | null>(
    null
  )
  const [deleteUser,setDeleteUser] = useState<DataType | null>(null)
  const { updateUserMutation } = useUpdateUser(Number(currentEditingUser?.id))
  const {deleteUserMutation} = useDeleteUser(Number(deleteUser?.id))
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (currentEditingUser) {
      form.setFieldsValue({
        ...currentEditingUser,
        role: currentEditingUser?.roles,
        tenantId: currentEditingUser?.tenant?.id,
      })
      setOpen(true)
    }
  }, [currentEditingUser, form])


  useEffect(() => {
    if (deleteUser) {
      deleteUserMutation()
    }
  }, [deleteUser,deleteUserMutation])

  const handleCreateUser = async () => {
    try {
      await form.validateFields()
      if (isEditing) updateUserMutation(form.getFieldsValue())
      else createUserMutation(form.getFieldsValue())
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
    }, 500)
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
              setIsEditing(false)
              setCurrentEditingUser(null)
              form.resetFields()
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
          pageSize: PaginationResultLimitForUser,
          current: data?.data?.currentPage,
          total: data?.data?.count,
          onChange: (page) => {
            setQueryParams((prev) => ({
              ...prev,
              currentPage: Number(page),
            }))
          },
          showTotal: (total: number, range: number[]) => {
            return `Showing ${range[0]} - ${range[1]} of ${total} users`
          },
        }}
        columns={[
          ...columns!,
          {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
              <Space size="small">
                <Button type="link">
                  <EditOutlined
                    onClick={() => {
                      /*                       console.log(record,"record")
                       */
                      setIsEditing(true)
                      setCurrentEditingUser(record)
                    }}
                    style={{
                      fontSize: "1.1rem",
                    }}
                  />{" "}
                </Button>
                <Button
                  style={{
                    color: "red",
                  }}
                  type="link"
                >
                  <DeleteOutlined
                  onClick={()=>{
                    console.log(record,"record in delete")
                    setDeleteUser(record)
                    
                  }}
                    style={{
                      fontSize: "1.1rem",
                    }}
                  />{" "}
                </Button>
              </Space>
            ),
          },
        ]}
        dataSource={data?.data?.users}
      />
      <Modal
        centered={isEditing}
        style={{
          top: isEditing ? "-5%" : "5%",
        }}
        onClose={() => {
          form.resetFields()
          setCurrentEditingUser(null)
          setIsEditing(false)
          setOpen(false)
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
            {isEditing ? "Edit" : "Create"} User form
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
          <CreateUserForm {...{ isEditing }} />
        </Form>
      </Modal>
    </Suspense>
  )
}
export default Users
