import { User } from 'src/types/user.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'
import { LoginFormData } from 'src/utils/rules'

type AuthResponse = {
  access_token: string
  refresh_token: string
  user: User
}

export const registerAccount = (body: FormData) => {
  return http.post<SuccessResponse<AuthResponse>>('user/register', body)
}

export const login = (body: LoginFormData) => {
  return http.post<SuccessResponse<AuthResponse>>('user/login', body)
}

export const logout = () => {
  return http.post<SuccessResponse<null>>('user/logout')
}

export const refreshAccessToken = () => {
  return http.post<SuccessResponse<string>>('user/refresh-token')
}
