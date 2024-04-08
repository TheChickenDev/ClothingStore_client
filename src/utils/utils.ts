import { jwtDecode } from 'jwt-decode'
import { userImg } from 'src/assets/images'
import { JWTPayload } from 'src/types/utils.type'

export const formatCurrency = (price: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
}

export const formatNumberToSocialStyle = (value: number) => {
  return new Intl.NumberFormat('en-EN', { notation: 'compact', maximumFractionDigits: 2 }).format(value)
}

export const decodeJWT = (token: string): JWTPayload => {
  return jwtDecode(token)
}

export const getEmailFromJWT = (token: string): string => {
  if (!token) return userImg.defaultAvatar
  const { email } = decodeJWT(token)
  return email
}

export const getAvatarFromJWT = (token: string): string => {
  if (!token) return 'anonymous@hein.shop'
  const { avatar } = decodeJWT(token)
  return avatar
}
