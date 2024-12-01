export interface CreateUserDataProps{
  email: string
  password: string
  tenantId: number
  role: string
  firstName: string
  lastName: string
}

export interface CreateRestaurantDataProps{
  name : string
  address : string
}

export interface UpdateUserDataProps{
  email: string
  tenantId?: number | null
  role: string
  firstName: string
  lastName: string
}