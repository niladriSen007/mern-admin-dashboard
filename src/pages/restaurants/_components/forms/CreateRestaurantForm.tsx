import { Card, Col, Form, Input, Row, Space } from "antd"
import { CardStyles } from "../../../users/styles/Users.styles"

const CreateRestaurantForm = () => {
  return (
    <Space
    style={{
      width: "100%",
    }}
    direction="vertical"
    size={"middle"}
  >
    <Card
      style={CardStyles}
      title={
        <Space
          style={{
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          Basic info
        </Space>
      }
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="name"
            label="Restaurant name"
            rules={[{ required: true, message: "Please enter restaurant name" }]}
          >
            <Input placeholder="Please enter restaurant name" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="address"
            label="Address"
            rules={[
              { required: true, message: "Please enter restaurant address" },
              {min: 10, message: "Address should be greater than 10 characters"}
            ]}
          >
            <Input
              style={{ width: "100%" }}
              placeholder="Please enter restaurant address"
            />
          </Form.Item>
        </Col>
      
      </Row>
    </Card>
  
  </Space>
  )
}
export default CreateRestaurantForm