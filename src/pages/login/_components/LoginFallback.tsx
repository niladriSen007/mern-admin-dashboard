// src/pages/login/_components/FallbackLoading.tsx
import { Card, Skeleton, Space } from "antd"
import { memo } from "react"
import {
  CardStyles,
  LayoutStyles,
  LogoContainerStyles,
  MainContentStyles,
} from "../styles/Login.styles"

const LoginFallback = memo(() => {
  return (
    <div style={LayoutStyles}>
      <Space direction="vertical" size="large" align="center">
        <div style={MainContentStyles}>
          <Skeleton.Avatar active size="large" shape="circle" />
        </div>
        <Card
          style={CardStyles}
          title={
            <Space
              size={"small"}
              direction="horizontal"
              align="center"
              style={LogoContainerStyles}
            >
              <Skeleton.Input active style={{ width: 100 }} />
            </Space>
          }
        >
          <Skeleton active paragraph={{ rows: 4 }} />
        </Card>
      </Space>
    </div>
  )
})

export default LoginFallback
