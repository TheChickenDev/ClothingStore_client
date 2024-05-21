import { Product, ProductList, ProductSearchParams } from 'src/types/product.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

export const getProducts = (params: ProductSearchParams) => {
  return http.get<SuccessResponse<ProductList>>('product/get', { params })
}

export const getProduct = (productId: string | undefined) => {
  return http.get<SuccessResponse<Product>>(`product/get-by-id/${productId}`)
}
