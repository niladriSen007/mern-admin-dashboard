import { Suspense, useState } from "react"
import Fallback from "../../components/common/Fallback"
import BreadCrumb from "./_components/BreadCrumb"
import { Button, Flex, Form } from "antd"
import ProductFilter from "./_components/ProductFilter"

const Products = () => {
  const [filterForm] = Form.useForm()
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [currentEditingProduct, setCurrentEditingProduct] = useState(null)
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
        /*       onFieldsChange={onFilterChange}
         */
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
    </Suspense>
  )
}
export default Products
