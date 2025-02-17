import { Layout, theme } from "antd"
import { lazy, memo, Suspense } from "react"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import Fallback from "../../components/common/Fallback"
import { useAuthStore } from "../../store/store"
import { getSidebarItems } from "./utils/items"

const HeaderComponent = lazy(() => import("./_components/Header"))
const SideBar = lazy(() => import("./_components/SideBar"))
const { Content } = Layout

const AuthLayout = memo(() => {
  const location = useLocation()
  const { user } = useAuthStore()

  const {
    token: { colorBgContainer },
  } = theme.useToken()
  if (!user)
    return (
      <Navigate
        to={`/unauth/login?returnTo=${location.pathname}`}
        replace={true}
      />
    )

  return (
    <Suspense fallback={<Fallback label="Dashboard" />}>
      <Layout style={{ minHeight: "100vh" }}>
        <SideBar
          colorBgContainer={colorBgContainer}
          items={getSidebarItems(user?.roles)}
          location={location}
        />
        <Layout>
          <HeaderComponent colorBgContainer={colorBgContainer} />
          <Content style={{ margin: "48px" }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Suspense>
  )
})
export default AuthLayout
