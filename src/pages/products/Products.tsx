import Icon, { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Button, Flex, Form, Modal, Space, Table } from "antd"
import { debounce } from "lodash"
import { Suspense, useMemo, useState } from "react"
import Fallback from "../../components/common/Fallback"
import { useAllProductsDataFetch } from "../../hooks/useAllProductsDataFetch"
import BreadCrumb from "./_components/BreadCrumb"
import ProductFilter from "./_components/ProductFilter"
import { FileldData, Product } from "./types"
import { columns } from "./utils/Columns"
import {
  PaginationResultLimitForProduct,
  PaginationResultLimitForUser,
} from "../../constants/Constants"
import Vector from "../../components/icons/Vector"
import CreateProductForm from "./_components/forms/CreateProductForm"
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
    limit: PaginationResultLimitForProduct,
    q: "",
    tenantId: "",
    categoryId: "",
    isPublished: undefined,
  })


  const handleCreateProduct = async () => {
    try {
      await form.validateFields()
    /*   if (isEditing) updateUserMutation(form.getFieldsValue())
      else createUserMutation(form.getFieldsValue()) */
    } catch (error: unknown) {
      throw new Error(error as string)
    } finally {
      form.resetFields()
      setOpen(!open)
    }
  }

  const { data: products } = useAllProductsDataFetch(queryParams)
  /*    //console.log(products, "data") */
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
    //console.log(changedFields, "cf")

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
      <Form form={filterForm} onFieldsChange={onFilterChange}>
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
            + Create Product
          </Button>
        </ProductFilter>
      </Form>
      <Table
        rowKey={"id"}
        pagination={{
          position: ["bottomRight"],
          pageSize: PaginationResultLimitForProduct,
          current: products?.data?.data?.page,
          total: products?.data?.data?.total,
          onChange: (page) => {
            setQueryParams((prev) => ({
              ...prev,
              currentPage: Number(page),
            }))
          },
          showTotal: (total: number, range: number[]) => {
            return `Showing ${range[0]} - ${range[1]} of ${total} products`
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
                      ////console.log(record, "record")
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
                      //console.log(record, "record in delete")
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
       <Modal
        centered={isEditing}
        style={{
          top: isEditing ? "-5%" : "5%",
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
            {isEditing ? "Edit" : "Create"} Product form
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
                setCurrentEditingProduct(null)
                setOpen(false)
              }}
            >
              Cancel
            </Button>
            <Button
              icon={<Icon size={32} component={Vector} />}
              type="primary"
              onClick={handleCreateProduct}
            >
              Save
            </Button>
          </Space>
        }
        loading={loading}
        open={open}
        onCancel={() => {
          setCurrentEditingProduct(null)
          setIsEditing(false)
          setOpen(false)
        }}
      >
        <Form layout="vertical" form={form} style={{
          maxHeight: "700px",
        }}>
          <CreateProductForm {...{ isEditing }} />
        </Form>
      </Modal>
    </Suspense>
  )
}
export default Products
