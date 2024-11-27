import { lazy } from "react"
import { Layout, theme } from "antd"
import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "../../store/store"
const SideBar = lazy(() => import("./_components/SideBar"))
import { items } from "./utils/items"
const { Content, Header } = Layout

const AuthLayout = () => {
  const { user } = useAuthStore()
  if (!user) return <Navigate to="/unauth/login" replace={true} />

  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SideBar colorBgContainer={colorBgContainer} items={items} />
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "0 16px" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
export default AuthLayout
