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
import languages from 'src/constants/languages'
import { refreshAccessToken } from 'src/apis/auth.api'
import { toast } from 'react-toastify'

const formDataUrl = ['user/update', 'user/register']

class HTTP {
  instance: AxiosInstance
  private access_token: string | null
  private refresh_token: string | null

  constructor() {
    this.access_token = getAccessTokenFromLocalStorage()
    this.refresh_token = getRefreshTokenFromLocalStorage()
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      timeout: 30000
    })
    this.instance.interceptors.request.use(
      async (config) => {
        if (config.headers && this.access_token && this.refresh_token) {
          const contentType = formDataUrl.some((item) => config.url?.includes(item))
            ? 'multipart/form-data'
            : 'application/json'
          console.log(contentType)
          console.log(formDataUrl.some((item) => config.url?.includes(item)))
          config.headers['access_token'] = 'Bearer ' + this.access_token
          config.headers['refresh_token'] = 'Bearer ' + this.refresh_token
          config.headers['Content-Type'] = contentType
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
      async (error) => {
        const originalRequest = error.config
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true
          const refreshTokenResponse = await refreshAccessToken()
          const new_access_token = refreshTokenResponse.data.data
          saveAccessTokenToLocalStorage(new_access_token)
          this.access_token = new_access_token
          originalRequest.headers.access_token = 'Bearer ' + new_access_token
          return this.instance(originalRequest)
            .then((response) => {
              return response
            })
            .catch((error) => {
              toast.error(error)
            })
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new HTTP().instance

export default http
