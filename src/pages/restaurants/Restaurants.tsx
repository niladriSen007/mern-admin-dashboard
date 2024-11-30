import Icon, { LoadingOutlined } from "@ant-design/icons"
import { Alert, Button, Flex, Form, Modal, Space, Spin, Table } from "antd"
import { lazy, Suspense, useMemo, useState } from "react"
import { Navigate } from "react-router-dom"
import Fallback from "../../components/common/Fallback"
import { useAuthStore } from "../../store/store"
import { debounce } from "lodash"
import Vector from "../../components/icons/Vector"
import { useAllRestaurantsDataFetch } from "../../hooks/useAllRestaurantsDataFetch"
import CreateRestaurantForm from "./_components/forms/CreateRestaurantForm"
import { columns } from "./utils/Columns"
import { useCreateRestaurant } from "../../hooks/useCreateRestaurant"
import { FileldData } from "../users/types"
const RestaurantFilter = lazy(() => import("./_components/RestaurantFilter"))
const BreadCrumb = lazy(() => import("./_components/BreadCrumb"))

const Restaurants = () => {
  const [queryParams, setQueryParams] = useState({
    currentPage: 1,
    limit: 6,
    q: "",
  })
  const { user } = useAuthStore()
  const { data, isFetching, error } = useAllRestaurantsDataFetch(queryParams)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const [filterForm] = Form.useForm()
  const { createRestaurantMutation } = useCreateRestaurant()

  const handleCreateRestaurant = async () => {
    try {
      await form.validateFields()
      createRestaurantMutation(form.getFieldsValue())
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
    }
  }

  if (user?.roles !== "ADMIN") return <Navigate to="/" replace={true} />
  return (
    <Suspense fallback={<Fallback label={"Restaurant data"} />}>
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
        <RestaurantFilter>
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
      </Form>
      <Table
        rowKey={"id"}
        pagination={{
          position: ["bottomRight"],
          pageSize: 3,
        }}
        columns={columns}
        dataSource={data?.data?.tenants}
      />

      <Modal
        centered
        width={"800px"}
        height={"600px"}
        title={
          <Space
            style={{
              margin: "16px 0",
              fontSize: "20px",
            }}
          >
            Restaurant form
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
              onClick={handleCreateRestaurant}
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
          <CreateRestaurantForm />
        </Form>
      </Modal>
    </Suspense>
  )
}
export default Restaurants
