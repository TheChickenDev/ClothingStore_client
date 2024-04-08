import { User } from 'src/types/user.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'
import { LoginFormData, RegisterFormData } from 'src/utils/rules'

type AuthResponse = {
  user: User
}

export const registerAccount = (body: RegisterFormData) => {
  return http.post<SuccessResponse<AuthResponse>>('user/register', body)
}

export const login = (body: LoginFormData) => {
  return http.post<SuccessResponse<AuthResponse>>('user/login', body)
}

export const logout = () => {
  return http.post<SuccessResponse<null>>('user/logout')
}
