export interface RestaurantDataType {
  id: string
  name: string
  address: string
  users:{
    id: string
    firstName: string
    lastName: string
    email: string
  }[]
  createdAt: string
}
