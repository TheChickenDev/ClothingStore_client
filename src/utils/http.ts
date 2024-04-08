import axios, { AxiosInstance } from 'axios'
import {
  saveAccessTokenToLocalStorage,
  saveRefreshTokenToLocalStorage,
  getAccessTokenFromLocalStorage,
  removeDataFromLocalStorage,
  saveThemeToLocalStorage,
  saveLanguageToLocalStorage,
  saveUserEmailToLocalStorage,
  saveUserAvatarToLocalStorage
} from './auth'
import languages from 'src/constants/languages'

class HTTP {
  instance: AxiosInstance
  private access_token: string | null

  constructor() {
    this.access_token = getAccessTokenFromLocalStorage()
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (config.headers && this.access_token) {
          config.headers.authorization = this.access_token
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === 'user/login' || url === 'user/register') {
          if (response.data.data) {
            const { access_token, refresh_token, user } = response.data.data
            saveAccessTokenToLocalStorage(access_token)
            saveRefreshTokenToLocalStorage(refresh_token)
            saveUserEmailToLocalStorage(user.email)
            saveUserAvatarToLocalStorage(user.avatar)
            saveThemeToLocalStorage(false)
            saveLanguageToLocalStorage(languages.vietnamese)
          }
        } else if (url === 'user/logout') {
          removeDataFromLocalStorage()
        }
        return response
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }
}

const http = new HTTP().instance

export default http
