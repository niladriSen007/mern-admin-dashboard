import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./index";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  }
])