import { createBrowserRouter } from "react-router-dom"

import { LoginPage, AuthLayout, Dashboard, UnauthLayout,RootLayout,Users } from "./index"
import Restaurants from "../pages/restaurants/Restaurants"
import SingleRestaurant from "../pages/restaurants/id/SingleRestaurant"


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
          {
            path: "/restaurants/:id",
            element: <SingleRestaurant />
          },
          {
            path: "/restaurants",
            element: <Restaurants />,
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
