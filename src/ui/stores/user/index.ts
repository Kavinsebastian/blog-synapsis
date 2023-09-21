import { CreateUserRequest } from "@/domain/request";
import { UserResponse } from "@/domain/response";
import { createUserApiService, deleteUserApiService, getUsersApiService, updateUserApiService } from "@/infrastructure/services/user";
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
  updateUser: (id: number, payload: CreateUserRequest) => Promise<boolean>
  createUser: (payload: CreateUserRequest) => Promise<boolean>
  deleteUser: (id: number) => Promise<boolean>
}

const useUsersStore = create(immer<UsersState & UsersActions>((set) => ({
  page: 1,
  users: [],
  isLoading: false,
  headersData: [
    { label: 'user id', type: 'col', maxWidth: 220, minWidth: 220 },
    { label: 'name', type: 'col', maxWidth: 320, minWidth: 320 },
    { label: 'email', type: 'col', maxWidth: 320, minWidth: 320 },
    { label: 'gender', type: 'col', maxWidth: 120, minWidth: 120 },
    { label: 'status', type: 'col', maxWidth: 120, minWidth: 120 },
    { label: 'detail', type: 'button', maxWidth: 180, minWidth: 130 },
    { label: 'Update', type: 'button', maxWidth: 130, minWidth: 130 },
    { label: 'Delete', type: 'button', maxWidth: 130, minWidth: 130 }
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
        console.log('DEBUG ERROR: ', error.response?.status)
    }
    const mapperData = mapperDataUsers(result)

    return set((state) => ({ ...state, users: mapperData, isLoading: false }))
  },
  updateUser: async (id, payload) => {
    let result;
    try {
      const response = await updateUserApiService(id, payload)
      result = Boolean(response)
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log('DEBUG ERROR: ', error)
      }
      result = false
    }

    set((state) => ({ ...state, isLoading: false }))
    return result
  },
  createUser: async (payload) => {
    let result;
    try {
      const response = await createUserApiService(payload)
      result = Boolean(response)
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log('DEBUG ERROR: ', error)
      }
      result = false
    }

    set((state) => ({ ...state, isLoading: false }))
    return result
  },
  deleteUser: async (id) => {
    let result;
    try {
      await deleteUserApiService(id)
      result = true
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log('DEBUG ERROR: ', error)
      }
      result = false
    }
    set((state) => ({ ...state, isLoading: false }))
    return result
  }
})))

const mapperDataUsers = (users: UserResponse[]) => {
  const mapperPosts: DataTables[][] = []
  users.forEach((item) => {
    const col: DataTables[] = [
      { id: item.id, label: 'user id', value: item.id, maxWidth: 220, minWidth: 220 },
      { id: item.id, label: 'name', value: item.name, maxWidth: 320, minWidth: 320 },
      { id: item.id, label: 'email', value: item.email, maxWidth: 320, minWidth: 320 },
      { id: item.id, label: 'gender', value: item.gender, maxWidth: 120, minWidth: 120 },
      { id: item.id, label: 'status', value: item.status, maxWidth: 120, minWidth: 120 },
      { id: item.id, label: 'Detail', action: `/users/${item.id}`, maxWidth: 130, minWidth: 130 },
      { id: item.id, label: 'Update', action: `/users/${item.id}/update`, maxWidth: 130, minWidth: 130, customClass: "!text-orange-400" },
      { id: item.id, label: 'Delete', action: `#`, maxWidth: 130, minWidth: 130, customClass: "!text-red-400" }
    ]

    mapperPosts.push(col)
  })

  return mapperPosts
}
export default useUsersStore
