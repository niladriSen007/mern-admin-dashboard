import {
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Switch,
  Typography,
} from "antd"
import { memo, ReactNode } from "react"
import { roleFilter } from "../../users/utils/filterData"

interface ProductFilterProps {
  children: ReactNode
}
const ProductFilter = memo(({ children }: ProductFilterProps) => {
  return (
    <Card
      style={{
        margin: "10px 0 16px 0",
        borderRadius: "8px",
        boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Row justify={"space-between"}>
        <Col span={16}>
          <Row gutter={20} >
            <Col span={6}>
              <Form.Item name="q">
                <Input.Search allowClear placeholder="Search user" />
              </Form.Item>
            </Col>
            <Col >
              <Form.Item name="category">
                <Select
                  allowClear
                  style={{ width: 120 }}
                  placeholder="Select category"
                  
                >
                  {roleFilter.map((role) => (
                    <Select.Option key={role?.key} value={role?.value}>
                      {role?.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col >
              <Form.Item name="tenant">
                <Select
                  allowClear
                  style={{ width: 120 }}
                  placeholder="Select tenant"
                >
                  {roleFilter.map((role) => (
                    <Select.Option key={role?.key} value={role?.value}>
                      {role?.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Space size="middle">
                {" "}
                <Switch  checkedChildren="published" unCheckedChildren="all" defaultChecked onChange={() => {}} />
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
