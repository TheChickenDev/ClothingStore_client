import { CartItem } from './product.type'

export interface Order {
  _id: string
  name: string
  phone: string
  address: string
  orderDate: Date
  deliveryDate: Date
  isCompleted?: boolean
  products?: Array<CartItem>
  price: number
  shippingFee: number
  totalAmount: number
  note?: string
  paymentMethod?: string
}
