import Icon from "@ant-design/icons"
import Home from '../../../components/icons/Home';
import { NavLink } from "react-router-dom";
import UserIcon from "../../../components/icons/UserIcon";
import { FoodIcon } from "../../../components/icons/FoodIcon";
import BasketIcon from "../../../components/icons/BasketIcon";
import GiftIcon from "../../../components/icons/GiftIcon";
export const items = [
  {
    key: "/",
    icon: <Icon component={Home} />,
    label: <NavLink to="/">Home</NavLink>,
  },
  {
    key: "/users",
    icon: <Icon component={UserIcon} />,
    label: <NavLink to="/users">Users</NavLink>,
  },
  {
    key: '/products',
    icon: <Icon component={FoodIcon} />,
    label: <NavLink to="/products">Products</NavLink>,
},
{
    key: '/orders',
    icon: <Icon component={BasketIcon} />,
    label: <NavLink to="/orders">Orders</NavLink>,
},
{
    key: '/promos',
    icon: <Icon component={GiftIcon} />,
    label: <NavLink to="/promos">Promos</NavLink>,
},
]