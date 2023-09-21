import { UserResponse } from "@/domain/response"
import { useNotify } from "@/ui/context"
import useUsersStore from "@/ui/stores/user"
import { useRouter } from "next/router"
import { SyntheticEvent, useCallback, useEffect, useState } from "react"

interface Props {
  users: UserResponse[]
  isLoading: boolean
}

interface State {
  perPage: number
  search: string
}

const useHooks = ({ users, isLoading }: Props) => {
  const router = useRouter()
  const notify = useNotify()
  const [
    headersData,
    page,
    usersData,
    isFetching,
    setUsers,
    setLoading,
    setPage,
    getUsers,
    deleteUser
  ] = useUsersStore((state) => [
    state.headersData,
    state.page,
    state.users,
    state.isLoading,
    state.setUsers,
    state.setLoading,
    state.setPage,
    state.getUsers,
    state.deleteUser
  ])

  const [state, setState] = useState<State>({
    perPage: 10,
    search: ''
  })

  const counterPage = useCallback((page: number) => {
    if (page < 1 || users.length < state.perPage) return;
    setLoading(true)
    setPage(page)
    getUsers(page, state.perPage, state.search)

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [getUsers, users.length, setLoading, setPage, state.perPage, state.search])

  const handleSearch = useCallback((event: SyntheticEvent) => {
    const value = (<HTMLInputElement>event.target).value
    setState((prev) => ({ ...prev, search: value }))
  }, [])

  const onClickSearch = useCallback(() => {
    setLoading(true)
    setPage(1)
    getUsers(1, state.perPage, state.search)
  }, [getUsers, setLoading, setPage, state.perPage, state.search])

  const onClickDelete = useCallback(async (label: string, id?: number) => {
    if (!id || label !== 'Delete') return;
    setLoading(true)
    const response = await deleteUser(id)
    if (response) {
      getUsers(1, state.perPage, state.search)
      notify?.open({ message: "successfully", type: "success" })
      return;
    }

    notify?.open({ message: "Failed to fetch", type: "success" })
  }, [deleteUser, getUsers, notify, setLoading, state.perPage, state.search])


  useEffect(() => {
    setLoading(isLoading)
    setUsers(users)
  }, [users.length, isLoading, setLoading, setUsers, users])

  return {
    state: {
      ...state,
      headersData,
      page,
      usersData,
      isFetching,
      router
    },
    methods: {
      counterPage,
      onClickSearch,
      handleSearch,
      onClickDelete
    }
  }
}

export default useHooks
