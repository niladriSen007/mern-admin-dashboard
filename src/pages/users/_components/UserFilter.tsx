import { Button, Card, Col, Input, Row, Select } from "antd"
import { memo } from "react"
import { roleFilter, statusFilter } from "../utils/filterData"

const UserFilter = memo(() => {
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
              <Input.Search placeholder="Search user" />
            </Col>
            <Col>
              <Select defaultValue="ALL" style={{ width: 120 }}>
                {roleFilter.map((role) => (
                  <Select.Option key={role?.key} value={role?.value}>
                    {role?.label}
                  </Select.Option>
                ))}
              </Select>
            </Col>
            <Col>
              <Select defaultValue="all" style={{ width: 120 }}>
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
          <Button type="primary">+ Create User</Button>
        </Col>
      </Row>
    </Card>
  )
})
export default UserFilter
