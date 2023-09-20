import { UserResponse } from "@/domain/response";
import { getUsersApiService } from "@/infrastructure/services/user";
import { DataTables } from "@/infrastructure/types";
import { AxiosError } from "axios";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface UsersState {
  headersData: DataTables[],
  page: number,
  users: DataTables[][],
  isLoading: boolean
}

interface UsersActions {
  setUsers: (users: UserResponse[]) => void
  setLoading: (value: boolean) => void
  setPage: (value: number) => void
  getUsers: (page?: number, perPage?: number, search?: string) => void
}

const useUsersStore = create(immer<UsersState & UsersActions>((set) => ({
  page: 1,
  users: [],
  isLoading: false,
  headersData: [
    { label: 'user id', type: 'col', maxWidth: 220, minWidth: 220 },
    { label: 'name', type: 'col', maxWidth: 320, minWidth: 320 },
    { label: 'email', type: 'col', maxWidth: 420, minWidth: 420 },
    { label: 'gender', type: 'cl', maxWidth: 220, minWidth: 220 },
    { label: 'status', type: 'col', maxWidth: 220, minWidth: 220 },
    { label: 'detail', type: 'button', maxWidth: 180, minWidth: 180 }
  ],
  setLoading: (value) => set((state) => ({ ...state, isLoading: value })),
  setPage: (value) => set((state) => ({ ...state, page: value })),
  setUsers: (users) => set((state) => {
    const mapperData = mapperDataUsers(users)

    return {
      ...state,
      users: mapperData,
      isLoading: false
    }
  }),
  getUsers: async (page = 1, perPage = 10, search = '') => {
    let result: UserResponse[] = [];
    try {
      const response = await getUsersApiService(page, perPage, search)
      if (!response) throw Error

      result = response
    } catch (error: unknown) {
      if (error instanceof AxiosError)
        console.log('err', error.response?.status)
    }
    const mapperData = mapperDataUsers(result)

    return set((state) => ({ ...state, users: mapperData, isLoading: false }))
  }
})))

const mapperDataUsers = (users: UserResponse[]) => {
  const mapperPosts: DataTables[][] = []
  users.forEach((item) => {
    const col: DataTables[] = [
      { label: 'user id', value: item.id, maxWidth: 220, minWidth: 220 },
      { label: 'name', value: item.name, maxWidth: 320, minWidth: 320 },
      { label: 'email', value: item.email, maxWidth: 420, minWidth: 420 },
      { label: 'gender', value: item.gender, maxWidth: 220, minWidth: 220 },
      { label: 'status', value: item.status, maxWidth: 220, minWidth: 220 },
      { label: 'Detail', action: `/${item.id}`, maxWidth: 180, minWidth: 180 }
    ]

    mapperPosts.push(col)
  })

  return mapperPosts
}
export default useUsersStore
