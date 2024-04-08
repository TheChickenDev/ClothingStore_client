import languages from 'src/constants/languages'

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

export const saveUserEmailToLocalStorage = (email: string) => {
  localStorage.setItem('user_email', email)
}

export const getUserEmailFromLocalStorage = (): string => {
  const email = localStorage.getItem('user_email')
  return email || 'anonymous@hein.shop'
}

export const saveUserAvatarToLocalStorage = (avatar: string) => {
  localStorage.setItem('user_avatar', avatar)
}

export const getUserAvatarFromLocalStorage = (): string => {
  const avatar = localStorage.getItem('user_avatar')
  return avatar || ''
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
  localStorage.removeItem('user_email')
  localStorage.removeItem('user_avatar')
  localStorage.removeItem('darkTheme')
  localStorage.removeItem('language')
}
