import { lazy } from "react"
export const LoginPage = lazy(() => import("../pages/login/LoginPage"))
export const AuthLayout = lazy(() => import("../layouts/authenticated/AuthLayout"))
export const UnauthLayout = lazy(() => import("../layouts/unauthenticated/UnauthLayout"))
export const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"))