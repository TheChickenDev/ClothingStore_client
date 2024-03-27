import { User } from 'src/types/user.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'
import { LoginFormData, RegisterFormData } from 'src/utils/rules'

export const registerAccount = (body: RegisterFormData) => {
  return http.post<SuccessResponse<User>>('user/register', body)
}

export const login = (body: LoginFormData) => {
  return http.post<SuccessResponse<User>>('user/login', body)
}
