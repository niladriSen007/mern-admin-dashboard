import { createBrowserRouter } from "react-router-dom"

import { LoginPage, AuthLayout, Dashboard, UnauthLayout } from "./index"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/unauth",
    element: <UnauthLayout />,
    children: [
      {
        path: "/unauth/login",
        element: <LoginPage />,
      },
    ],
  },
])
