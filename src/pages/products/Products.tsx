import { Suspense, useMemo, useState } from "react"
import Fallback from "../../components/common/Fallback"
import BreadCrumb from "./_components/BreadCrumb"
import { Button, Flex, Form, Space, Table } from "antd"
import ProductFilter from "./_components/ProductFilter"
import { columns } from "./utils/Columns"
import Icon, {
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
} from "@ant-design/icons"
import { FileldData, Product } from "./types"
import { debounce } from "lodash"
import { useAllProductsDataFetch } from "../../hooks/useAllProductsDataFetch"
const Products = () => {
  const [filterForm] = Form.useForm()
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [currentEditingProduct, setCurrentEditingProduct] =
    useState<Product | null>(null)
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null)
  const [queryParams, setQueryParams] = useState({
    currentPage: 1,
    limit: 6,
    q: "",
    tenantId: "",
    categoryId: "",
    isPublished: true,
  })

  const {data : products} = useAllProductsDataFetch(queryParams)
/*   console.log(products?.data?.data?.data, "data") */
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
       console.log(changedFields,"cf")
  
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

  return (
    <Suspense fallback={<Fallback label={"Products data"} />}>
      <Flex justify="space-between">
        <BreadCrumb />
        {/* {error && (
          <Alert
            type="error"
            showIcon
            closable
            message={error?.message}
            banner={true}
          />
        )} */}
      </Flex>
      <Form
        form={filterForm}
              onFieldsChange={onFilterChange}
      >
        <ProductFilter>
          <Button
            type="primary"
            onClick={() => {
              setIsEditing(false)
              setCurrentEditingProduct(null)
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
        </ProductFilter>
      </Form>
      <Table
        rowKey={"id"}
        pagination={{
          position: ["bottomRight"],
          /*  pageSize: PaginationResultLimitForUser,
          current: data?.data?.currentPage,
          total: data?.data?.count,
          onChange: (page) => {
            setQueryParams((prev) => ({
              ...prev,
              currentPage: Number(page),
            }))
          }, */
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
                      setCurrentEditingProduct(record)
                      setIsEditing(true)
                      //console.log(record, "record")
                      setOpen(true)
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
                    onClick={() => {
                      console.log(record, "record in delete")
                      setDeleteProduct(record)
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
                dataSource={products?.data?.data?.data}
        
      />
    </Suspense>
  )
}
export default Products
