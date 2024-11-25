import { lazy, memo, Suspense } from "react"
import { LockFilled } from "@ant-design/icons"
import { Card, Layout, Space, Typography } from "antd"
const Logo = lazy(() => import("../../components/logo/Logo"))
const LoginForm = lazy(() => import("./_components/LoginForm"))
import {
  CardStyles,
  LayoutStyles,
  LogoContainerStyles,
  LogoStyles,
  MainContentStyles,
} from "./styles/Login.styles"
import LoginFallback from "./_components/LoginFallback"

const LoginPage = memo(() => {
  return (
    <Suspense fallback={<LoginFallback />}>
      <Layout style={LayoutStyles}>
        <Space direction="vertical" size="large" align="center">
          <Layout.Content style={MainContentStyles}>
            <Logo />
          </Layout.Content>
          <Card
            style={CardStyles}
            title={
              <Space
                direction="vertical"
                align="center"
                content="center"
                size={"small"}
                style={{ display: "flex" }}
              >
                <Space
                  size={"small"}
                  direction="horizontal"
                  style={LogoContainerStyles}
                >
                  <LockFilled />
                  <Typography style={LogoStyles}>Sign in</Typography>
                </Space>
                <Typography style={{ fontWeight: "lighter" }}>
                  Welcome back. Login to order awesome foods
                </Typography>
              </Space>
            }
          >
            <LoginForm />
          </Card>
        </Space>
      </Layout>
    </Suspense>
  )
})
export default LoginPage
