import { LoginUserData } from "../pages/login/types";
import { api } from "./httpClient";

export const loginUser = (userData: LoginUserData)  => {
  return api.post("/auth/login", userData)
}

export const getSelfData = () => {
  return api.get(`/auth/self`)
}

export const logoutUser = () => {
  return api.post(`/auth/logout`)
}

