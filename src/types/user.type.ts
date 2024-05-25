import { CartItem } from './product.type'

export interface User {
  _id: string
  isAdmin: boolean
  name: string
  email: string
  address: string
  phone: string
  avatar: string
  cart: Array<CartItem>
  createdAt: string
  updatedAt: string
}
