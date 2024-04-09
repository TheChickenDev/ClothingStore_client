interface thumbnail {
  url: string
  path: string
}

export interface Product {
  _id?: string
  name: string
  desc?: string
  type?: string
  price: number
  price_before_discount: number
  quantity?: number
  sold: number
  view?: number
  rating: number
  size?: Array<string>
  img: string
  imgPath?: string
  thumbnail: Array<thumbnail>
}

export interface ProductList {
  productList: Array<Product>
  currentPage: number
  totalPage: number
}

export interface ProductSearchParams {
  limit?: number
  page?: number
  sort_by?: 'price' | 'rating' | 'sold' | 'view' | 'updatedAt'
  order?: 'asc' | 'desc'
  price_min?: number
  price_max?: number
  rating_filter?: number
  name?: string
}
