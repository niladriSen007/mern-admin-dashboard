import { Card, Col, Form, Input, Row } from "antd"
import { memo, ReactNode } from "react"

interface RestaurantFilterProps {
  children: ReactNode
}

const RestaurantFilter = memo(({ children }: RestaurantFilterProps) => {
  return (
    <Card
      style={{
        margin: "10px 0 16px 0",
        borderRadius: "8px",
        boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Row justify={"space-between"}>
        <Col span={8}>
          <Row justify={"space-between"} align={"middle"} gutter={16}>
            <Col>
              <Form.Item name={"q"}>
                <Input.Search  placeholder="Search Restaurant" />
              </Form.Item>
            </Col>
          </Row>
        </Col>
        <Col>{children}</Col>
      </Row>
    </Card>
  )
})
export default RestaurantFilter
