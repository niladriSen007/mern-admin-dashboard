import { Card, Col, Form, Input, Row, Space, Typography } from "antd"
import { useSingleCategoryFetch } from "../../../../hooks"
interface PriceCardProps {
  selectedCategory: string
}

const PricingCard = ({ selectedCategory }: PriceCardProps) => {
  const { categoryData } = useSingleCategoryFetch(selectedCategory)
  //console.log(categoryData, selectedCategory, "categoryData")
  return (
    <Card
      style={{ boxShadow: "3px 3px 8px rgba(0, 0, 0, 0.08)" }}
      title={<Space>Product Pricing</Space>}
    >
      {categoryData?.priceConfiguration &&
        Object.keys(categoryData.priceConfiguration).map((key) => {
          return (
            <Space key={key} direction="vertical">
              <Typography.Text
                style={{ fontWeight: "medium", marginBottom: "10px" }}
              >
                {" "}
                {key} ({categoryData.priceConfiguration[key].priceType})
              </Typography.Text>
              <Row key={key} gutter={16}>
                {categoryData.priceConfiguration[key].availableOptions.map(
                  (option) => {
                    return (
                      <Col
                        span={
                          24 /
                          categoryData.priceConfiguration[key].availableOptions
                            .length
                        }
                        key={option}
                      >
                        <Form.Item
                          name={option}
                          label={option}
                          rules={[
                            {
                              required: true,
                              message: `Please enter ${option} price`,
                            },
                          ]}
                        >
                          <Input placeholder={`Enter ${option} price`} />
                        </Form.Item>
                      </Col>
                    )
                  }
                )}
              </Row>
            </Space>
          )
        })}
    </Card>
  )
}

export default PricingCard
