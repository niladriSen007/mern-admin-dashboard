import { Card, Row, Space, Col, Form, Input } from "antd"

const PricingCard = () => {
  return (
    <Card
      style={{ boxShadow: "3px 3px 8px rgba(0, 0, 0, 0.08)" }}
      title={<Space>Product Pricing</Space>}
    >
      <Row gutter={32} align={"middle"}>
        <Col span={8}>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please enter product price" }]}
          >
            <Input placeholder="Please enter product price" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="discount"
            label="Discount"
            rules={[
              { required: true, message: "Please enter product discount" },
            ]}
          >
            <Input placeholder="Please enter product discount" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="stock"
            label="Stock"
            rules={[{ required: true, message: "Please enter product stock" }]}
          >
            <Input placeholder="Please enter product stock" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="stock"
            label="Stock"
            rules={[{ required: true, message: "Please enter product stock" }]}
          >
            <Input placeholder="Please enter product stock" />
          </Form.Item>
        </Col>
      </Row>
    </Card>
  )
}

export default PricingCard
