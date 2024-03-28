import languages from 'src/constants/languages'
import { User } from 'src/types/user.type'

export const saveAccessTokenToLocalStorage = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}

export const getAccessTokenFromLocalStorage = (): string | null => {
  const access_token = localStorage.getItem('access_token') || null
  return access_token
}

export const saveRefreshTokenToLocalStorage = (refresh_token: string) => {
  localStorage.setItem('refresh_token', refresh_token)
}

export const getRefreshTokenFromLocalStorage = (): string | null => {
  const refresh_token = localStorage.getItem('refresh_token') || null
  return refresh_token
}

export const saveUserDataToLocalStorage = (email: string) => {
  localStorage.setItem('user_data', email)
}

export const getUserDataFromLocalStorage = (): User | null => {
  const userData = localStorage.getItem('user_data')
  if (userData) return JSON.parse(userData)
  return null
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

export const removeDataFromLocalStorage = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('user_data')
  localStorage.removeItem('darkTheme')
  localStorage.removeItem('language')
}
