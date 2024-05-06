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
  products: Array<Product>
  currentPage: number
  totalPage: number
  totalProduct: number
}

export interface ProductSearchParams {
  limit?: string
  page?: string
  sort_by?: 'price' | 'rating' | 'sold' | 'view' | 'updatedAt' | string
  order?: 'asc' | 'desc' | string
  price_min?: string
  price_max?: string
  rating_filter?: string
  name?: string
}
