import { lazy } from "react"
export const LoginPage = lazy(() => import("../pages/login/LoginPage"))
export const AuthLayout = lazy(
  () => import("../layouts/authenticated/AuthLayout")
)
export const UnauthLayout = lazy(
  () => import("../layouts/unauthenticated/UnauthLayout")
)
export const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"))
export const Users = lazy(() => import("../pages/users/Users"))
export const RootLayout = lazy(() => import("../layouts/root/RootLayout"))
export const Products = lazy(() => import("../pages/products/Products"))