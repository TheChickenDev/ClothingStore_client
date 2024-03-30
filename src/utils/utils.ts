export const formatCurrency = (price: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
}

export const formatNumberToSocialStyle = (value: number) => {
  return new Intl.NumberFormat('en-EN', { notation: 'compact', maximumFractionDigits: 2 }).format(value)
}
