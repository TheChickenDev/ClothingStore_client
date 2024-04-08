import axios, { AxiosInstance } from 'axios'
import {
  saveAccessTokenToLocalStorage,
  saveRefreshTokenToLocalStorage,
  getAccessTokenFromLocalStorage,
  removeDataFromLocalStorage,
  saveThemeToLocalStorage,
  saveLanguageToLocalStorage,
  getRefreshTokenFromLocalStorage
} from './auth'
import { jwtDecode } from 'jwt-decode'
import languages from 'src/constants/languages'
import { toast } from 'react-toastify'

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
      async (config) => {
        if (config.headers && this.access_token) {
          const { exp } = jwtDecode(this.access_token)
          const currentTime = new Date().getTime() / 1000
          const refreshToken = getRefreshTokenFromLocalStorage()
          if (exp && exp < currentTime) {
            await this.instance
              .post(
                'user/refresh-token',
                {},
                {
                  headers: {
                    authorization: refreshToken
                  },
                  withCredentials: true
                }
              )
              .then((response) => {
                const { access_token } = response.data.data
                saveAccessTokenToLocalStorage(access_token)
                this.access_token = access_token
              })
              .catch((error) => {
                toast.error(error.response.data.message)
              })
          }
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
            const { access_token, refresh_token } = response.data.data
            saveAccessTokenToLocalStorage(access_token)
            saveRefreshTokenToLocalStorage(refresh_token)
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
