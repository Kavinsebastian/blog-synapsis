import { PostsResponse } from "@/domain/response"
import usePostStore from "@/ui/stores/post"
import { SyntheticEvent, useCallback, useEffect, useState } from "react"

interface Hooks {
  isLoading: boolean
  posts: PostsResponse[]
}

interface States {
  search: string
  perPage: number
}

const useHooks = ({ isLoading, posts }: Hooks) => {
  const [
    headersData,
    postsData,
    isFetching,
    page,
    setPage,
    setLoading,
    setPosts,
    getPosts
  ] = usePostStore((state) => [
    state.headersData,
    state.posts,
    state.isLoading,
    state.page,
    state.setPage,
    state.setLoading,
    state.setPosts,
    state.getPosts,
  ])

  const [state, setState] = useState<States>({
    search: '',
    perPage: 10
  })

  const counterPage = useCallback((page: number) => {
    if (page < 1 || postsData.length < state.perPage) return;
    setLoading(true)
    setPage(page)
    getPosts(page, state.perPage, state.search)

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [getPosts, postsData.length, setLoading, setPage, state.perPage, state.search])

  const handleSearch = useCallback((event: SyntheticEvent) => {
    const value = (<HTMLInputElement>event.target).value
    setState((prev) => ({ ...prev, search: value }))
  }, [])

  const onClickSearch = useCallback(() => {
    setLoading(true)
    setPage(1)
    getPosts(1, state.perPage, state.search)
  }, [getPosts, setLoading, setPage, state.perPage, state.search])


  useEffect(() => {
    setPosts(posts)
    setLoading(isLoading)
  }, [isLoading, posts, setLoading, setPosts])

  return {
    state: {
      ...state,
      page,
      postsData,
      headersData,
      isFetching
    },
    methods: {
      setState,
      counterPage,
      handleSearch,
      onClickSearch
    }
  }
}

export default useHooks
