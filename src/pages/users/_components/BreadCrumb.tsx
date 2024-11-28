import { Breadcrumb } from "antd"
import { memo } from "react"
import { Link } from "react-router-dom"

const BreadCrumb = memo(() => {
  return (
    <Breadcrumb
    style={{
      color: "#000",
      fontSize: 16,
      marginBottom: 20,
    }}
    separator=">"
    items={[
      {
        title: <Link to="/">Dashboard</Link>,
      },
      {
        title: "Users",
      },
    ]}
  />
  )
})
export default BreadCrumb