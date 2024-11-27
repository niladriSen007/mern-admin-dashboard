import { BellOutlined } from "@ant-design/icons"
import { Avatar, Badge, Dropdown, Flex, Layout, Space, theme } from "antd"
import { lazy, Suspense } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "../../store/store"
import DashboardFallback from "./_components/DashboardFallback"
import { items } from "./utils/items"
import { useLogout } from "../../hooks/useLogout"
const SideBar = lazy(() => import("./_components/SideBar"))
const { Content, Header } = Layout

const AuthLayout = () => {
  const { user } = useAuthStore()
  const { userLogoutMutation } = useLogout()
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
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  if (!user) return <Navigate to="/unauth/login" replace={true} />

  return (
    <Suspense fallback={<DashboardFallback />}>
      <Layout style={{ minHeight: "100vh" }}>
        <SideBar colorBgContainer={colorBgContainer} items={items} />
        <Layout>
          <Header style={{ padding: "0 64px", background: colorBgContainer }}>
            <Flex
              justify="space-between"
              align="center"
              style={{ height: "100%" }}
            >
              <Badge text="Global" status="success" />
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
          <Content style={{ margin: "0 16px" }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Suspense>
  )
}
export default AuthLayout
