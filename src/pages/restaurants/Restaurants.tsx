import Icon, { DeleteOutlined, EditOutlined, LoadingOutlined } from "@ant-design/icons"
import { Alert, Button, Flex, Form, Modal, Space, Spin, Table } from "antd"
import { debounce } from "lodash"
import { lazy, Suspense, useEffect, useMemo, useState } from "react"
import { Navigate } from "react-router-dom"
import Fallback from "../../components/common/Fallback"
import Vector from "../../components/icons/Vector"
import { PaginationResultLimitForRestaurant } from "../../constants/Constants"
import { useAllRestaurantsDataFetch } from "../../hooks/useAllRestaurantsDataFetch"
import { useCreateRestaurant } from "../../hooks/useCreateRestaurant"
import { useAuthStore } from "../../store/store"
import { FileldData, TenantDataType } from "../users/types"
import CreateRestaurantForm from "./_components/forms/CreateRestaurantForm"
import { columns } from "./utils/Columns"
import { useUpdateTenant } from "../../hooks/useUpdateTenant"
import { useDeleteTenant } from "../../hooks/useDeleteTenant"
const RestaurantFilter = lazy(() => import("./_components/RestaurantFilter"))
const BreadCrumb = lazy(() => import("./_components/BreadCrumb"))

const Restaurants = () => {
  const [queryParams, setQueryParams] = useState({
    currentPage: 1,
    limit: 3,
    q: "",
  })
  const { user } = useAuthStore()
  const { data, isFetching, error } = useAllRestaurantsDataFetch(queryParams)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const [filterForm] = Form.useForm()
  const { createRestaurantMutation } = useCreateRestaurant()
  const [isEditing, setIsEditing] = useState(false)
  const [currentEditingTenant, setCurrentEditingTenant] = useState<TenantDataType | null>(
    null
  )
  const [deleteTenant,setDeleteTenant] = useState<TenantDataType | null>(null)
  const { updateTenantMutation } = useUpdateTenant(Number(currentEditingTenant?.id))
  const {deleteTenantMutation} = useDeleteTenant(Number(deleteTenant?.id))


  useEffect(() => {
    if (currentEditingTenant) {
      form.setFieldsValue({
        ...currentEditingTenant,
      })
      setOpen(true)
    }
  }, [currentEditingTenant, form])


  useEffect(() => {
    if (deleteTenant) {
      deleteTenantMutation()
    }
  }, [deleteTenant,deleteTenantMutation])


  const handleCreateRestaurant = async () => {
    try {
      await form.validateFields()
      if(isEditing) updateTenantMutation(form.getFieldsValue())
      else createRestaurantMutation(form.getFieldsValue())
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
          showTotal: (total : number,range: number[])=> `Showing ${range[0]} - ${range[1]} of ${total} restaurants`,
          position: ["bottomRight"],
          pageSize: PaginationResultLimitForRestaurant,
          total: data?.data?.count,
          current: data?.data?.currentPage,
          onChange: (page) => {
            setQueryParams((prev) => ({ ...prev, currentPage: page }))
          }
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
                      setCurrentEditingTenant(record)
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
                    setDeleteTenant(record)
                    
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
