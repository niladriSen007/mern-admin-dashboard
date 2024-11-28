import { BellOutlined } from "@ant-design/icons"
import { Avatar, Badge, Dropdown, Flex, Layout, Space } from "antd"
import { useLogout } from "../../../hooks/useLogout"
import { memo } from "react"
import { useAuthStore } from "../../../store/store"
import { Constants } from "../../../constants/Constants"

const { Header } = Layout
const HeaderComponent = memo(
  ({ colorBgContainer }: { colorBgContainer: string }) => {
    const { userLogoutMutation } = useLogout()
    const { user } = useAuthStore()

    const dropdownItems = [
      {
        key: "/profile",
        label: "Profile",
      },
      {
        key: "/settings",
        label: "Settings",
      },
      {
        key: "/logout",
        label: "Logout",
        onClick: () => userLogoutMutation(),
      },
    ]

    const { roles, tenant } = user || {}
    return (
      <Header style={{ padding: "4px 48px", background: colorBgContainer }}>
        <Flex justify="space-between" align="center" style={{ height: "100%" }}>
          <Badge
        
            text={
              roles === Constants?.MANAGER
                ? `Hi Manager. ${tenant?.name}, ${tenant?.address}`
                : "Hi, Admin"
            }
            status="success"
          />
          <Space size="middle">
            <Badge dot>
              <BellOutlined size={38} />
            </Badge>
            <Dropdown
              menu={{ items: dropdownItems }}
              placement="bottomRight"
              arrow={true}
            >
              <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
            </Dropdown>
          </Space>
        </Flex>
      </Header>
    )
  }
)
export default HeaderComponent
