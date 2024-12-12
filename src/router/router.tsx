

import Restaurants from "../pages/restaurants/Restaurants"
import SingleRestaurant from "../pages/restaurants/id/SingleRestaurant"
import {
  AuthLayout,
  Dashboard,
  LoginPage,
  Products,
  RootLayout,
  UnauthLayout,
  Users,
} from "./index"

import { BrowserRouter, Route, Routes } from "react-router"

export const router = (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="restaurants/:id" element={<SingleRestaurant />} />
          <Route path="restaurants" element={<Restaurants />} />
          <Route path="products" element={<Products />} />
        </Route>
        <Route path="unauth" element={<UnauthLayout />}>
          <Route path="login" element={<LoginPage />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
)
