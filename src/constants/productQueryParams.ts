export const popularProductQueryParams = {
  limit: '8',
  page: '1',
  sort_by: 'view',
  order: 'desc'
} as const

export const latestProductQueryParams = {
  limit: '8',
  page: '1',
  sort_by: 'updatedAt',
  order: 'desc'
} as const

export const topSaleProductQueryParams = {
  limit: '8',
  page: '1',
  sort_by: 'sold',
  order: 'desc'
} as const
