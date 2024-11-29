import Icon from "@ant-design/icons"
import Home from "../../../components/icons/Home"
import { NavLink } from "react-router-dom"
import UserIcon from "../../../components/icons/UserIcon"
import { FoodIcon } from "../../../components/icons/FoodIcon"
import BasketIcon from "../../../components/icons/BasketIcon"
import GiftIcon from "../../../components/icons/GiftIcon"

export const getSidebarItems = (role: string) => {
  const baseItems = [
    {
      key: "/",
      icon: <Icon component={Home} />,
      label: <NavLink to="/">Home</NavLink>,
      priority: 1,
    },

    {
      key: "/products",
      icon: <Icon component={FoodIcon} />,
      label: <NavLink to="/products">Products</NavLink>,
      priority: 3,
    },
    {
      key: "/orders",
      icon: <Icon component={BasketIcon} />,
      label: <NavLink to="/orders">Orders</NavLink>,
      priority: 4,
    },
    {
      key: "/promos",
      icon: <Icon component={GiftIcon} />,
      label: <NavLink to="/promos">Promos</NavLink>,
      priority: 5,
    },
  ]

  if (role === "ADMIN") {
    baseItems.push({
      key: "/users",
      icon: <Icon component={UserIcon} />,
      label: <NavLink to="/users">Users</NavLink>,
      priority: 2,
    })
    return baseItems.sort((a, b) => a.priority - b.priority)
  }

  return baseItems
}
