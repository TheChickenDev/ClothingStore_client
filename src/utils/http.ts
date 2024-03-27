import axios, { AxiosInstance } from 'axios'
import {
  saveAccessTokenToLocalStorage,
  saveRefreshTokenToLocalStorage,
  saveUserDataToLocalStorage,
  getAccessTokenFromLocalStorage,
  removeDataFromLocalStorage
} from './auth'

class HTTP {
  instance: AxiosInstance
  private access_token: string | null

  constructor() {
    this.access_token = getAccessTokenFromLocalStorage()
    this.instance = axios.create({
      baseURL: 'http://localhost:5000/api/',
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
            saveUserDataToLocalStorage(JSON.stringify(user))
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
