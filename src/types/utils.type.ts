export interface SuccessResponse<data> {
  status: string
  message: string
  data: data
}

export interface ErrorResponse<data> {
  status: string
  message: string
  data?: data
}
