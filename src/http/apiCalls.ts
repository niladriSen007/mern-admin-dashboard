import { CreateRestaurantDataProps, CreateUserDataProps, UpdateUserDataProps } from "../hooks/types"
import { LoginUserData } from "../pages/login/types"
import { TenantDataType } from "../pages/users/types"
import { api } from "./httpClient"

export const loginUser = (userData: LoginUserData) => {
  return api.post("/auth/login", userData)
}

export const getSelfData = () => {
  return api.get(`/auth/self`)
}

export const logoutUser = () => {
  return api.post(`/auth/logout`)
}

export const getAllUsers = (
  currentPage: number,
  limit: number,
  q: string,
  role: string
) => {
  return api.get(
    `/users/getAllUsers?currentPage=${currentPage?.toString()}&limit=${limit?.toString()}&q=${q}&role=${role}`
  )
}

export const getAllTenants = ( currentPage: number,
  limit: number,
  q: string,) => {
  return api.get(`/tenants?currentPage=${currentPage?.toString()}&limit=${limit?.toString()}&q=${q}`)
}

export const getSingleTenant = (id: string) => {
  return api.get(`/tenants/${id}`)
}

export const createUser = (userData: CreateUserDataProps) => {
  return api.post(`/users/register`, userData)
}

export const createRestaurant = (restaurantData: CreateRestaurantDataProps) => {
  return api.post(`/tenants`, restaurantData)
}

export const registerAdmin = (userData: CreateUserDataProps) => {
  return api.post(`/auth/register`, userData)
}

export const updateUser = (userData: UpdateUserDataProps,userId : number) => {
  return api.patch(`/users/${userId}`, userData)
}

export const deleteUser = (userId: number) => {
  return api.delete(`/users/${userId}`)
}


export const updateTenant = (tenantData: TenantDataType,tenantId : number) => {
  return api.patch(`/tenants/${tenantId}`, tenantData)
}

export const deleteTenant = (tenantId: number) => {
  return api.delete(`/tenants/${tenantId}`)
}