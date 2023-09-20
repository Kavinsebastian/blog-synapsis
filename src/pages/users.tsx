import React from 'react'
import Users from '@/ui/screens/Users'
import { GetServerSideProps, NextPage } from 'next'
import { getUsersApiService } from '@/infrastructure/services/user'
import { AxiosError } from 'axios'
import { UserResponse } from '@/domain/response'

interface Props {
  users: any
  isLoading: boolean
}

const UsersPage: NextPage<Props> = ({ users, isLoading }) => {
  return (
    <Users users={users} isLoading={isLoading} />
  )
}


export const getServerSideProps: GetServerSideProps = async () => {
  let result: UserResponse[] = [];
  let isLoading = true
  try {
    const response = await getUsersApiService()
    if (!response) throw Error

    result = response
  } catch (error: unknown) {
    if (error instanceof AxiosError)
      console.log('err', error.response?.status)
  } finally {
    isLoading = false
  }

  return {
    props: {
      users: result,
      isLoading
    }
  }
}

export default UsersPage
