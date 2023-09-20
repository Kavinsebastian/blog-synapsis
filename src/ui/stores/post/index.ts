import { PostsResponse } from '@/domain/response'
import { DataTables } from '@/infrastructure/types'
import { getPostsApiService } from '@/infrastructure/services/post'
import { AxiosError } from 'axios'
import { immer } from 'zustand/middleware/immer'
import { create } from 'zustand'

interface PostState {
  posts: DataTables[][],
  headersData: DataTables[],
  isLoading: boolean
  page: number
}

interface PostActions {
  setPosts: (posts: PostsResponse[]) => void
  getPosts: (page?: number, perPage?: number, search?: string) => void
  setLoading: (value: boolean) => void
  setPage: (value: number) => void
}

const usePostStore = create(immer<PostState & PostActions>((set) => ({
  posts: [],
  isLoading: false,
  page: 1,
  headersData: [
    { label: 'user ID', type: 'col', maxWidth: 120, minWidth: 120 },
    { label: 'Title', type: 'col', maxWidth: 120, minWidth: 120 },
    { label: 'Body', type: 'col', maxWidth: 120, minWidth: 120 },
    { label: 'Edit', type: 'button', maxWidth: 120, minWidth: 120 }
  ],
  setPage: (value) => set((state) => ({ ...state, page: value })),
  setLoading: (value) => set((state) => ({ ...state, isLoading: value })),
  setPosts: (posts: PostsResponse[]) => set((state) => {
    const mapperData = mapperDataPosts(posts)

    return {
      ...state,
      posts: mapperData,
      isLoading: false
    }
  }),
  getPosts: async (page = 1, perPage = 10, search = '') => {
    let result: PostsResponse[] = []
    try {
      const response = await getPostsApiService(page, perPage, search)
      if (!response) throw Error
      result = response
    } catch (error: unknown) {
      if (error instanceof AxiosError)
        console.log('err', error.response?.status)
    }
    return set((state) => {
      const mapperData = mapperDataPosts(result)
      return {
        ...state,
        posts: mapperData,
        isLoading: false
      }
    })
  }
})))

const mapperDataPosts = (posts: PostsResponse[]) => {
  const mapperPosts: DataTables[][] = []
  posts.forEach((item) => {
    const col: DataTables[] = [
      { label: "User ID", value: item?.userId || '', maxWidth: 120, minWidth: 120 },
      { label: "title", value: item.title, maxWidth: 120, minWidth: 120 },
      { label: "body", value: item.body, maxWidth: 120, minWidth: 120 },
      { label: "Detail", action: `/post/${item.id}`, maxWidth: 120, minWidth: 120 },
    ]

    mapperPosts.push(col)
  })

  return mapperPosts
}

export default usePostStore
