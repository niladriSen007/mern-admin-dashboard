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
  Upload,
} from "antd"
import { InboxOutlined } from "@ant-design/icons"
import { memo } from "react"
import { useAllRestaurantsDataFetch } from "../../../../hooks"
import { useCategoriesFetch } from "../../../../hooks/useCategoriesFetch"
import { RestaurantDataType } from "../../../restaurants/types"
import { Category } from "../../types"
import PricingCard from "./PricingCard"
import AttributesCard from "./AttributesCard"

const CreateProductForm = memo(
  ({ isEditing = false }: { isEditing: boolean }) => {
    const selectedCategory = Form.useWatch("categoryId")
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
          maxHeight: "700px",
          overflowY: "auto",
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.05)",
          scrollbarGutter: "5px",
          scrollBehavior: "smooth",
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
          <Row gutter={32} align={"middle"}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  { required: true, message: "Please enter product name" },
                ]}
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
                name="tenantId"
                label="Tenant"
                rules={[{ required: true, message: "Please choose a tenant " }]}
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

            <Col span={12}>
              <Form.Item name="tag" label="Tag">
                <Input placeholder="Please enter product tag" />
              </Form.Item>
            </Col>
            <Col span={24} style={{ height: "120px" }}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: "Please enter product description",
                  },
                ]}
              >
                <Input.TextArea
                  style={{ width: "100%", height: "100px" }}
                  placeholder="Please enter product description"
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card
          style={{ boxShadow: "3px 3px 8px rgba(0, 0, 0, 0.08)" }}
          title={<Space>Product Image</Space>}
        >
          <Row gutter={16}>
            <Col span={24} style={{ height: "140px" }}>
              <Form.Item
                name="image"
                label="Upload Image"
                rules={[
                  { required: true, message: "Please upload a product image" },
                ]}
              >
                <Upload listType="picture-card" className="avatar-uploader">
                  <Space direction="vertical">
                    <InboxOutlined />
                    <Typography.Text type="secondary">upload</Typography.Text>
                  </Space>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {selectedCategory && <PricingCard />}
        {selectedCategory && <AttributesCard />}

        <Card
          style={{ boxShadow: "3px 3px 8px rgba(0, 0, 0, 0.08)" }}
          title={<Space>Other Properties</Space>}
        >
          <Row>
            <Col span={24} style={{ height: "100px" }}>
              <Space
                size="middle"
                style={{
                  padding: "0px",
                }}
              >
                <Switch
                  checkedChildren="yes"
                  unCheckedChildren="no"
                  defaultChecked
                  onChange={() => {}}
                />
                <Typography.Text>Is published</Typography.Text>{" "}
              </Space>
            </Col>
          </Row>
        </Card>
      </Space>
    )
  }
)
export default CreateProductForm
