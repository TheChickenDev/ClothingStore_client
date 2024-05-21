import { CartItem } from 'src/types/product.type'
import { User } from 'src/types/user.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

export const getUserDetail = (id: string) => {
  return http.get<SuccessResponse<User>>(`user/get-by-id/${id}`)
}

export const addToCart = (id: string, body: CartItem) => {
  return http.patch<SuccessResponse<string>>(`user/add-to-cart/${id}`, body)
}
