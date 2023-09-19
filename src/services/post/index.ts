import { invoke } from '@/config/api'
import { API_SERVICES, API_VERSION } from '@/constants'
import { PostsResponse } from '@/domain/response'
import { toMapCamelCase } from '@/utils'

export const getPosts = async (): Promise<PostsResponse> => {
  const response = await invoke("GET", `${API_VERSION.V2}${API_SERVICES.POSTS}`, "", null)
  return toMapCamelCase(response.data)
}
