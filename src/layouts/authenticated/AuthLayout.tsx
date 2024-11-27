import { Layout, theme } from "antd"
import { lazy, memo, Suspense } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "../../store/store"
import DashboardFallback from "./_components/DashboardFallback"
const HeaderComponent = lazy(() => import("./_components/Header"))
import { items } from "./utils/items"
const SideBar = lazy(() => import("./_components/SideBar"))
const { Content } = Layout

const AuthLayout = memo(() => {
  const { user } = useAuthStore()

  const {
    token: { colorBgContainer },
  } = theme.useToken()
  if (!user) return <Navigate to="/unauth/login" replace={true} />

  return (
    <Suspense fallback={<DashboardFallback />}>
      <Layout style={{ minHeight: "100vh" }}>
        <SideBar colorBgContainer={colorBgContainer} items={items} />
        <Layout>
          <HeaderComponent colorBgContainer={colorBgContainer} />
          <Content style={{ margin: "0 16px" }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Suspense>
  )
})
export default AuthLayout
