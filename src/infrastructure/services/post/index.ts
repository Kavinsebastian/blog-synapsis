import { BaseParams } from '@/domain/request'
import { PostCommentResponse, PostResponse, PostsResponse } from '@/domain/response'
import { invoke } from '@/infrastructure/config/api'
import { API_SERVICES, API_VERSION } from '@/infrastructure/constants'
import { toMapCamelCase } from '@/infrastructure/utils'

export const getPostsApiService = async (page: number = 1, perPage: number = 10, search: string = ''): Promise<PostsResponse[]> => {
  const params: BaseParams = {}
  params.page = page
  params.per_page = perPage
  if (isNaN(Number(search))) {
    params.title = search
  } else if (search !== '') {
    params.user_id = Number(search)
  }

  const response = await invoke("GET", `${API_VERSION.V2}${API_SERVICES.POSTS}`, params, null)
  return toMapCamelCase(response.data)
}

export const getPostApiService = async (id: number): Promise<PostResponse> => {
  const response = await invoke("GET", `${API_VERSION.V2}${API_SERVICES.POSTS}/${id}`, null, null)
  return toMapCamelCase(response.data)
}

export const getCommentPostApiService = async (id: number): Promise<PostCommentResponse[]> => {
  const response = await invoke("GET", `${API_VERSION.V2}${API_SERVICES.POSTS}/${id}/comments`, null, null)
  return toMapCamelCase(response.data)
}
