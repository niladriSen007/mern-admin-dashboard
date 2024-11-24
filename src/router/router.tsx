import { createBrowserRouter } from "react-router-dom";
import { HomePage, LoginPage } from "./index";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/unauth",
    children: [
      {
        path: "/unauth/login",
        element: <LoginPage />
      }
    ]
  }
])