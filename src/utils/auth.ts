export const saveAccessTokenToLocalStorage = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}

export const getAccessTokenFromLocalStorage = () => {
  const access_token = localStorage.getItem('access_token') || null
  return access_token
}

export const saveRefreshTokenToLocalStorage = (refresh_token: string) => {
  localStorage.setItem('refresh_token', refresh_token)
}

export const getRefreshTokenFromLocalStorage = () => {
  const refresh_token = localStorage.getItem('refresh_token') || null
  return refresh_token
}

export const saveUserDataToLocalStorage = (email: string) => {
  localStorage.setItem('user_data', email)
}

export const getUserDataFromLocalStorage = () => {
  const userData = localStorage.getItem('user_data')
  if (userData) return JSON.parse(userData)
  return null
}

export const removeDataFromLocalStorage = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('user_data')
}
