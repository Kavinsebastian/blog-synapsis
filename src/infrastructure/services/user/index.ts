import { BaseParams, CreateUserRequest } from "@/domain/request"
import { UserResponse } from "@/domain/response"
import { invoke } from "@/infrastructure/config/api"
import { API_SERVICES, API_VERSION } from "@/infrastructure/constants"
import { toMapCamelCase, toMapSnakeCase } from "@/infrastructure/utils"

export const getUserApiService = async (id: number): Promise<UserResponse> => {
  const response = await invoke("GET", `${API_VERSION.V2}${API_SERVICES.USERS}/${id}`)
  return toMapCamelCase(response.data)
}

export const getUsersApiService = async (page: number = 1, perPage: number = 10, search: string = ''): Promise<UserResponse[]> => {
  const params: BaseParams = {}
  params.page = page
  params.per_page = perPage
  if (search.includes('@')) {
    params.email = search
  } else if (!isNaN(Number(search)) && search !== '') {
    params.id = Number(search)
  } else if (search !== '') {
    params.name = search
  }
  const response = await invoke("GET", `${API_VERSION.V2}${API_SERVICES.USERS}`, params)
  return toMapCamelCase(response.data)
}

export const updateUserApiService = async (id: number, payload: CreateUserRequest): Promise<UserResponse> => {
  const request = toMapSnakeCase(payload)

  const response = await invoke("PUT", `${API_VERSION.V2}${API_SERVICES.USERS}/${id}`, null, request)
  return toMapCamelCase(response.data)
}

export const createUserApiService = async (payload: CreateUserRequest): Promise<UserResponse> => {
  const request = toMapSnakeCase(payload)

  const response = await invoke("POST", `${API_VERSION.V2}${API_SERVICES.USERS}`, null, request)

  return toMapCamelCase(response.data)
}

export const deleteUserApiService = async (id: number) => {
  const response = await invoke("DELETE", `${API_VERSION.V2}${API_SERVICES.USERS}/${id}`)
  return toMapCamelCase(response.data)
}
