import http from 'src/utils/http'

export const getUserDetail = (id: string) => {
  return http.get(`user/get-by-id/${id}`)
}
