import { Order } from 'src/types/order.type'
import { CartItem } from 'src/types/product.type'
import { User } from 'src/types/user.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

type AuthResponse = {
  access_token: string
  refresh_token: string
  user: User
}

export const updateAccount = (id: string, body: FormData) => {
  return http.patch<SuccessResponse<AuthResponse>>(`user/update/${id}`, body, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const getUserDetail = (id: string) => {
  return http.get<SuccessResponse<User>>(`user/get-by-id/${id}`, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const addToCart = (id: string, body: CartItem) => {
  return http.patch<SuccessResponse<Array<CartItem>>>(`user/add-to-cart/${id}`, body, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const removeFromCart = (id: string, productId: string, size: string) => {
  return http.patch<SuccessResponse<Array<CartItem>>>(
    `user/remove-from-cart/${id}`,
    { productId, size },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}

export const payment = (id: string, body: Order) => {
  return http.post<SuccessResponse<Order>>(`user/payment/${id}`, body, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const getOrders = (id: string) => {
  return http.get<SuccessResponse<Array<Order>>>(`order/get-by-user/${id}`, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
