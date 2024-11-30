import { Card, Col, Input, Row } from "antd"
import { ChangeEvent, memo, ReactNode } from "react"

interface RestaurantFilterProps {
  onFilterChange: (filterName: string, filterValue: string) => void
  children: ReactNode
}

const RestaurantFilter = memo(
  ({ onFilterChange,children }: RestaurantFilterProps) => {
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
                <Input.Search
                  allowClear
                  placeholder="Search Restaurant"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    onFilterChange("searchByName", e.target.value)
                  }
                />
              </Col>
             
            </Row>
          </Col>
          <Col>
           {children}
          </Col>
        </Row>
      </Card>
    )
  }
)
export default RestaurantFilter
