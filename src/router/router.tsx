import { createBrowserRouter } from "react-router-dom"

import { LoginPage, AuthLayout, Dashboard, UnauthLayout } from "./index"
import RootLayout from "../layouts/root/RootLayout"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
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
    ],
  },
])
