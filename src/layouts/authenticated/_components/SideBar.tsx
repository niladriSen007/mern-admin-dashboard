import Sider from "antd/es/layout/Sider"
import { memo, ReactNode, useState } from "react"
import Logo from "../../../components/logo/Logo"
import { Menu } from "antd"

interface Item {
  key: string
  icon: ReactNode
  label: ReactNode
}

const SideBar = memo(
  ({
    colorBgContainer,
    items,
  }: {
    colorBgContainer: string
    items: Item[]
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
            margin: "24px 32px 6px 32px",
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
)
export default SideBar
