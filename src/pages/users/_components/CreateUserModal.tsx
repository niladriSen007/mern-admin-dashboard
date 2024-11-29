import { Col, DatePicker, Form, Input, Modal, Row, Select } from "antd"

export interface CreateModalProps {
  children: React.ReactNode
  open: boolean
  setOpen: (open: boolean) => void
  loading: boolean
}

const CreateUserModal = ({
  children,
  open,
  setOpen,
  loading,
}: CreateModalProps) => {
  return (
    <Modal
      centered
      width={"800px"}
      height={"600px"}
      title={<p>Loading User form</p>}
      footer={children}
      loading={loading}
      open={open}
      onCancel={() => setOpen(!open)}
    >
      <Form layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please enter user name" }]}
            >
              <Input placeholder="Please enter user name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="url"
              label="Url"
              rules={[{ required: true, message: "Please enter url" }]}
            >
              <Input
                style={{ width: "100%" }}
                addonBefore="http://"
                addonAfter=".com"
                placeholder="Please enter url"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="owner"
              label="Owner"
              rules={[{ required: true, message: "Please select an owner" }]}
            >
              <Select placeholder="Please select an owner">
                <Select.Option value="xiao">Xiaoxiao Fu</Select.Option>
                <Select.Option value="mao">Maomao Zhou</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="type"
              label="Type"
              rules={[{ required: true, message: "Please choose the type" }]}
            >
              <Select placeholder="Please choose the type">
                <Select.Option value="private">Private</Select.Option>
                <Select.Option value="public">Public</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="approver"
              label="Approver"
              rules={[
                { required: true, message: "Please choose the approver" },
              ]}
            >
              <Select placeholder="Please choose the approver">
                <Select.Option value="jack">Jack Ma</Select.Option>
                <Select.Option value="tom">Tom Liu</Select.Option>
              </Select>
            </Form.Item>
          </Col>
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
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: true,
                  message: "please enter url description",
                },
              ]}
            >
              <Input.TextArea
                rows={4}
                placeholder="please enter url description"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
export default CreateUserModal
