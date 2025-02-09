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
import { useAllRestaurantsDataFetch, useCategoriesFetch } from "../../../hooks"

import { Category } from "../types"
import { useAuthStore } from "../../../store/store"

interface ProductFilterProps {
  children: ReactNode
}
const ProductFilter = memo(({ children }: ProductFilterProps) => {
    const { user } = useAuthStore()
  const { data: categories } = useCategoriesFetch()
  const {data: restaurants} = useAllRestaurantsDataFetch({
    currentPage: 1,
    limit: 20,
    q: "",
  })
  //console.log(restaurants?.data?.tenants)

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
                <Input.Search  placeholder="Search user" />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="categoryId">
                <Select
                  
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
           { user?.roles !== 'MANAGER' && <Col>
              <Form.Item name="tenantId">
                <Select
                  
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
            </Col>}
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
