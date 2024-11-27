import Sider from "antd/es/layout/Sider"
import { ReactNode, useState } from "react"
import Logo from "../../../components/logo/Logo"
import { Menu } from "antd"

const SideBar = ({
  colorBgContainer,
  items,
}: {
  colorBgContainer: string
  items: {
    key: string
    icon: ReactNode
    label: ReactNode
  }[]
}) => {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  return (
    <Sider
      theme="light"
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div
        style={{
          height: "32px",
          margin: "32px 32px 6px 32px",
          background: colorBgContainer,
        }}
      >
        {" "}
        <Logo />{" "}
      </div>
      <Menu
        theme="light"
        defaultSelectedKeys={["/"]}
        mode="inline"
        items={items}
        style={{
          marginTop: "16px",
        }}
      />
    </Sider>
  )
}
export default SideBar
