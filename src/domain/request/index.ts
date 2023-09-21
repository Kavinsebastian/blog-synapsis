export interface BaseParams {
  page?: number
  per_page?: number
  title?: string
  user_id?: number
  email?: string
  name?: string
  id?: number
}

export interface CreateUserRequest {
  name: string
  email: string
  status: string
  gender: string
}
