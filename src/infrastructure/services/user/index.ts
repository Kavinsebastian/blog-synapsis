import { BaseParams } from "@/domain/request"
import { UserResponse } from "@/domain/response"
import { invoke } from "@/infrastructure/config/api"
import { API_SERVICES, API_VERSION } from "@/infrastructure/constants"
import { toMapCamelCase } from "@/infrastructure/utils"

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
