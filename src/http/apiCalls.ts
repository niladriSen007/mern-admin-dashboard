import { CreateUserDataProps } from "../hooks/types";
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

export const getAllUsers = () => {
  return api.get(`/users/getAllUsers`)
}

export const getAllTenants = () => {
  return api.get(`/tenants`)
}

export const getSingleTenant = (id: string) => {
  return api.get(`/tenants/${id}`)
}

export const createUser = (userData: CreateUserDataProps) => {
  return api.post(`/users/register`, userData)
}

export const registerAdmin = (userData: CreateUserDataProps) => {
  return api.post(`/auth/register`, userData)
}
