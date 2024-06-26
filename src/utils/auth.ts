import languages from 'src/constants/languages'
import { CartItem } from 'src/types/product.type'

export const saveAccessTokenToLocalStorage = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}

export const getAccessTokenFromLocalStorage = (): string | '' => {
  const access_token = localStorage.getItem('access_token') || ''
  return access_token
}

export const saveRefreshTokenToLocalStorage = (refresh_token: string) => {
  localStorage.setItem('refresh_token', refresh_token)
}

export const getRefreshTokenFromLocalStorage = (): string | '' => {
  const refresh_token = localStorage.getItem('refresh_token') || ''
  return refresh_token
}

export const saveThemeToLocalStorage = (theme: boolean) => {
  localStorage.setItem('darkTheme', JSON.stringify(theme))
}

export const getThemeFromLocalStorage = (): boolean => {
  const theme = localStorage.getItem('darkTheme')
  if (theme) return JSON.parse(theme)
  return false
}

export const saveLanguageToLocalStorage = (language: string) => {
  localStorage.setItem('language', language)
}

export const getLanguageFromLocalStorage = (): string => {
  const language = localStorage.getItem('language')
  if (language) return language
  return languages.vietnamese
}

export const saveCartToLocalStorage = (cart: Array<CartItem>) => {
  localStorage.setItem('cart', JSON.stringify(cart))
}

export const addItemToCart = (item: CartItem): void => {
  const cart: Array<CartItem> = JSON.parse(localStorage.getItem('cart') || '[]')
  cart.push(item)
  localStorage.setItem('cart', JSON.stringify(cart))
}

export const getCartItems = (): Array<CartItem> => {
  const cart: Array<CartItem> = JSON.parse(localStorage.getItem('cart') || '[]')
  return cart
}

export const clearCart = (): void => {
  localStorage.removeItem('cart')
}

export const removeDataFromLocalStorage = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('darkTheme')
  localStorage.removeItem('language')
  localStorage.removeItem('cart')
}
