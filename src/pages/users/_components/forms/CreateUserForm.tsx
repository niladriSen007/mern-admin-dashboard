import { Card, Col, Form, Input, Row, Select, Space } from "antd"
import { useAllRestaurantsDataFetch } from "../../../../hooks/useAllRestaurantsDataFetch"
import { RestaurantDataType } from "../../../restaurants/types"
import { memo } from "react"
import { CardStyles } from "../../styles/Users.styles"

const CreateUserForm = memo(({isEditing = false} : {isEditing : boolean}) => {
  const { data } = useAllRestaurantsDataFetch({
    currentPage: 1,
    limit: 50,
    q: "",
  })
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
              name="firstName"
              label="First name"
              rules={[{ required: true, message: "Please enter user name" }]}
            >
              <Input placeholder="Please enter you first name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="lastName"
              label="Last name"
              rules={[
                { required: true, message: "Please enter your last name" },
              ]}
            >
              <Input
                style={{ width: "100%" }}
                placeholder="Please enter your last name"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input
                style={{ width: "100%" }}
                placeholder="Please enter your email"
              />
            </Form.Item>
          </Col>
        </Row>
      </Card>
      <Card style={CardStyles} title={<Space>Roles</Space>}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="role"
              label="Role"
              rules={[{ required: true, message: "Please select a role" }]}
            >
              <Select placeholder="Please select a role">
                <Select.Option value="ADMIN">Admin</Select.Option>
                <Select.Option value="MANAGER">Manager</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="tenantId"
              label="Tenant"
/*               rules={[{ required: true, message: "Please choose a tenant " }]}
 */            >
              <Select placeholder="Please choose the tenant">
                {data?.data?.tenants.map((tenant: RestaurantDataType) => {
                  return (
                    <Select.Option key={tenant?.id} value={tenant.id}>
                      {tenant.name}
                    </Select.Option>
                  )
                })}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Card>
      {/*  <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="dateTime"
              label="DateTime"
              rules={[
                { required: true, message: "Please choose the dateTime" },
              ]}
            >
              <DatePicker.RangePicker
                style={{ width: "100%" }}
                getPopupContainer={(trigger) => trigger.parentElement!}
              />
            </Form.Item>
          </Col>
        </Row> */}
      {!isEditing && <Card style={CardStyles} title={<Space>Security info</Space>}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="password"
              label="Passowrd"
              rules={[
                {
                  required: true,
                  message: "please enter valid password",
                },
              ]}
            >
              <Input.Password placeholder="please enter valid password" />
            </Form.Item>
          </Col>
        </Row>
      </Card>}
    </Space>
  )
})
export default CreateUserForm
