import { CreateRestaurantDataProps, CreateUserDataProps, UpdateUserDataProps } from "../hooks/types"
import { LoginUserData } from "../pages/login/types"
import { TenantDataType } from "../pages/users/types"
import { api } from "./httpClient"

export const AUTH_URL = '/api/v1/auth'
export const CATALOGUE_URL = '/api/v1/catalogue'

export const loginUser = (userData: LoginUserData) => {
  return api.post(`${AUTH_URL}/auth/login`, userData)
}

export const getSelfData = () => {
  return api.get(`${AUTH_URL}/auth/self`)
}

export const logoutUser = () => {
  return api.post(`${AUTH_URL}/auth/logout`)
}

export const getAllUsers = (
  currentPage: number,
  limit: number,
  q: string,
  role: string
) => {
  return api.get(
    `${AUTH_URL}/users/getAllUsers?currentPage=${currentPage?.toString()}&limit=${limit?.toString()}&q=${q}&role=${role}`
  )
}

export const getAllTenants = (currentPage: number,
  limit: number,
  q: string,) => {
  return api.get(`${AUTH_URL}/tenants?currentPage=${currentPage?.toString()}&limit=${limit?.toString()}&q=${q}`)
}

export const getSingleTenant = (id: string) => {
  return api.get(`${AUTH_URL}/tenants/${id}`)
}

export const createUser = (userData: CreateUserDataProps) => {
  return api.post(`${AUTH_URL}/users/register`, userData)
}

export const createRestaurant = (restaurantData: CreateRestaurantDataProps) => {
  return api.post(`${AUTH_URL}/tenants`, restaurantData)
}

export const registerAdmin = (userData: CreateUserDataProps) => {
  return api.post(`${AUTH_URL}/auth/register`, userData)
}

export const updateUser = (userData: UpdateUserDataProps, userId: number) => {
  return api.patch(`${AUTH_URL}/users/${userId}`, userData)
}

export const deleteUser = (userId: number) => {
  return api.delete(`${AUTH_URL}/users/${userId}`)
}


export const updateTenant = (tenantData: TenantDataType, tenantId: number) => {
  return api.patch(`${AUTH_URL}/tenants/${tenantId}`, tenantData)
}

export const deleteTenant = (tenantId: number) => {
  return api.delete(`${AUTH_URL}/tenants/${tenantId}`)
}


export const getAllCategoreis = () => {
  return api.get(`${CATALOGUE_URL}/category`)
}

export const getAllProducts = (
  currentPage: number,
  limit: number,
  q: string,
  tenantId: string,
  categoryId: string,
  isPublished: boolean | undefined,
) => {
  console.log(limit, "limit")
  return api.get(
    `${CATALOGUE_URL}/products?page=${currentPage?.toString()}&limit=${limit?.toString()}&q=${q}&tenantId=${tenantId}&categoryId=${categoryId}
    `
  )
}