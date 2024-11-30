export interface DataType {
  id: string
  firstName: string
  lastName: string
  email: string
  roles: string
  tenant : {
    id : string
    name: string
  }
  createdAt: string
}


export interface FileldData{
  name: string[]
  value?: string
}