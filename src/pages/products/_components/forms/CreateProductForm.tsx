import { Card, Col, Form, Input, Row, Select, Space } from "antd"

import { RestaurantDataType } from "../../../restaurants/types"
import { memo } from "react"
import { useAllRestaurantsDataFetch } from "../../../../hooks"
import { useCategoriesFetch } from "../../../../hooks/useCategoriesFetch"
import { Category } from "../../types"

const CreateProductForm = memo(
  ({ isEditing = false }: { isEditing: boolean }) => {
    /* const selectedRole = Form.useWatch("role") */
    const { data: categories } = useCategoriesFetch()
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
          style={{
            boxShadow: "3px 3px 8px rgba(0, 0, 0, 0.08)",
          }}
          title={
            <Space
              style={{
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              Product info
            </Space>
          }
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: "Please enter product name" }]}
              >
                <Input placeholder="Please enter product name" />
              </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item
                  name="categoryId"
                  label="Category"
                  rules={[
                    { required: true, message: "Please choose a category " },
                  ]}
                >
                  <Select placeholder="Please choose the category">
                    {categories?.data?.data.map((cat: Category) => {
                      return (
                          <Select.Option key={cat?._id} value={cat?._id}>
                          {cat?.name}
                        </Select.Option>
                      )
                    })}
                  </Select>
                </Form.Item>
              </Col>
            <Col span={12}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  { required: true, message: "Please enter product description" },
                ]}
              >
                <Input
                  style={{ width: "100%" }}
                  placeholder="Please enter product description"
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card
          style={{ boxShadow: "3px 3px 8px rgba(0, 0, 0, 0.08)" }}
          title={<Space>Roles</Space>}
        >
          <Row gutter={16}>
            {/* <Col span={12}>
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
            </Col> */}
             
             


              <Col span={12}>
                <Form.Item
                  name="tenantId"
                  label="Tenant"
                  rules={[
                    { required: true, message: "Please choose a tenant " },
                  ]}
                >
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
        {!isEditing && (
          <Card
            style={{ boxShadow: "3px 3px 8px rgba(0, 0, 0, 0.08)" }}
            title={<Space>Security info</Space>}
          >
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
          </Card>
        )}
      </Space>
    )
  }
)
export default CreateProductForm
