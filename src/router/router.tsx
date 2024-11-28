import { createBrowserRouter } from "react-router-dom"

import { LoginPage, AuthLayout, Dashboard, UnauthLayout,RootLayout,Users } from "./index"


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
          {
            path: "/users",
            element: <Users />,
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
