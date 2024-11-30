import Icon from "@ant-design/icons"
import { Button, Form, Modal, Space, Table } from "antd"
import { lazy, Suspense, useState } from "react"
import { Navigate } from "react-router-dom"
import Fallback from "../../components/common/Fallback"
import { useAuthStore } from "../../store/store"

import Vector from "../../components/icons/Vector"
import { useAllRestaurantsDataFetch } from "../../hooks/useAllRestaurantsDataFetch"
import CreateRestaurantForm from "./_components/forms/CreateRestaurantForm"
import { columns } from "./utils/Columns"
import { useCreateRestaurant } from "../../hooks/useCreateRestaurant"
const RestaurantFilter = lazy(() => import("./_components/RestaurantFilter"))
const BreadCrumb = lazy(() => import("./_components/BreadCrumb"))

const Restaurants = () => {
  const { user } = useAuthStore()
  const {data} = useAllRestaurantsDataFetch()
  console.log(data?.data?.tenants)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const {createRestaurantMutation} = useCreateRestaurant()

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
