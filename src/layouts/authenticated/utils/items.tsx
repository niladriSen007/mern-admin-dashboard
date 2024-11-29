import Icon from "@ant-design/icons"
import { NavLink } from "react-router-dom"
import BasketIcon from "../../../components/icons/BasketIcon"
import { FoodIcon } from "../../../components/icons/FoodIcon"
import GiftIcon from "../../../components/icons/GiftIcon"
import Home from "../../../components/icons/Home"
import Restaurant from "../../../components/icons/Restaurant"
import UserIcon from "../../../components/icons/UserIcon"

export const getSidebarItems = (role: string) => {
  const baseItems = [
    {
      key: "/",
      icon: <Icon component={Home} />,
      label: <NavLink to="/">Home</NavLink>,
      priority: 1,
    },
    {
      key: "/profile",
      icon: <Icon component={UserIcon} />,
      label: <NavLink to="/profile">Profile</NavLink>,
      priority: 7,
    },
    {
      key: "/restautants",
      icon: <Icon component={Restaurant} />,
      label: <NavLink to="/restaurants">Restaurant</NavLink>,
      priority: 3,
    },
    {
      key: "/products",
      icon: <Icon component={FoodIcon} />,
      label: <NavLink to="/products">Products</NavLink>,
      priority: 4,
    },
    {
      key: "/orders",
      icon: <Icon component={BasketIcon} />,
      label: <NavLink to="/orders">Orders</NavLink>,
      priority: 5,
    },
    {
      key: "/promos",
      icon: <Icon component={GiftIcon} />,
      label: <NavLink to="/promos">Promos</NavLink>,
      priority: 6,
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
