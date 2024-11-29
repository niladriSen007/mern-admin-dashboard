import { Card, Col, Input, Row, Select } from "antd"
import { ChangeEvent, memo, ReactNode } from "react"
import { roleFilter, statusFilter } from "../utils/filterData"

interface UserFilterProps {
  onFilterChange: (filterName: string, filterValue: string) => void
  children: ReactNode
}

const UserFilter = memo(
  ({ onFilterChange,children }: UserFilterProps) => {
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
                  placeholder="Search user"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    onFilterChange("searchByName", e.target.value)
                  }
                />
              </Col>
              <Col>
                <Select
                  allowClear
                  defaultValue="ALL"
                  style={{ width: 120 }}
                  onChange={(selectedValue: string) =>
                    onFilterChange("roleFilter", selectedValue)
                  }
                >
                  {roleFilter.map((role) => (
                    <Select.Option key={role?.key} value={role?.value}>
                      {role?.label}
                    </Select.Option>
                  ))}
                </Select>
              </Col>
              <Col>
                <Select
                  allowClear
                  defaultValue="all"
                  style={{ width: 120 }}
                  onChange={(selectedValue: string) =>
                    onFilterChange("statusFilter", selectedValue)
                  }
                >
                  {statusFilter.map((status) => (
                    <Select.Option key={status?.key} value={status?.value}>
                      {status?.label}
                    </Select.Option>
                  ))}
                </Select>
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
export default UserFilter
