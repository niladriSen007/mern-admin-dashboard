import { Card, Col, Form, Input, Row, Select } from "antd"
import { memo, ReactNode } from "react"
import { roleFilter } from "../utils/filterData"

interface UserFilterProps {
  children: ReactNode
}

const UserFilter = memo(({ children }: UserFilterProps) => {
  return (
    <Card
      style={{
        margin: "10px 0 16px 0",
        borderRadius: "8px",
        boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Row justify={"space-between"}>
        <Col span={6}>
          <Row justify={"space-between"} align={"middle"} gutter={16}>
            <Col>
              <Form.Item name="q">
                <Input.Search allowClear placeholder="Search user" />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="role">
                <Select allowClear style={{ width: 120 }}>
                  {roleFilter.map((role) => (
                    <Select.Option key={role?.key} value={role?.value}>
                      {role?.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            {/*  <Col>
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
            </Col> */}
          </Row>
        </Col>
        <Col>{children}</Col>
      </Row>
    </Card>
  )
})
export default UserFilter
