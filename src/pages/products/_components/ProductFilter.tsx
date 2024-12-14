import {
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Switch
} from "antd"
import { memo, ReactNode } from "react"
import { useAllRestaurantsDataFetch } from "../../../hooks"
import { useCategoriesFetch } from "../../../hooks/useCategoriesFetch"
import { Category } from "../types"

interface ProductFilterProps {
  children: ReactNode
}
const ProductFilter = memo(({ children }: ProductFilterProps) => {
  const { data: categories } = useCategoriesFetch()
  const {data: restaurants} = useAllRestaurantsDataFetch({
    currentPage: 1,
    limit: 20,
    q: "",
  })
  console.log(categories?.data?.data)

  return (
    <Card
      style={{
        margin: "10px 0 16px 0",
        borderRadius: "8px",
        boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Row justify={"space-between"} gutter={20}>
        <Col span={16}>
          <Row gutter={20}>
            <Col span={6}>
              <Form.Item name="q">
                <Input.Search allowClear placeholder="Search user" />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="category">
                <Select
                  allowClear
                  style={{ width: 160 }}
                  placeholder="Select category"
                >
                  {categories?.data?.data.map((cat : Category) => (
                    <Select.Option key={cat?._id} value={cat?._id}>
                      {cat?.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="tenant">
                <Select
                  allowClear
                  style={{ width: 180 }}
                  placeholder="Select tenant"
                >
                  {restaurants?.data?.tenants.map((restaurant:{id:number,name:string}) => (
                    <Select.Option key={restaurant?.id} value={restaurant?.id}>
                      {restaurant?.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Space size="middle">
                {" "}
                <Switch
                  checkedChildren="published"
                  unCheckedChildren="all"
                  defaultChecked
                  onChange={() => {}}
                />
                {/*  <Typography.Text>Show only published</Typography.Text>{" "} */}
              </Space>
            </Col>
          </Row>
        </Col>
        <Col>{children}</Col>
      </Row>
    </Card>
  )
})
export default ProductFilter
