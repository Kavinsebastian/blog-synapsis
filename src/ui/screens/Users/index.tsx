import React, { FC } from 'react'
import useHooks from './hooks'
import TextInput from '@/ui/components/TextInput'
import Button from '@/ui/components/Button'
import DataTable from '@/ui/components/DataTable'
import LoadingOverlay from '@/ui/components/LoadingOverlay'
import Pagination from '@/ui/components/Pagination'

interface Props {
  users: any[]
  isLoading: boolean
}

const Users: FC<Props> = ({ users, isLoading = true }) => {
  const { state, methods } = useHooks({ users, isLoading })
  return (
    <div className='flex flex-col gap-3'>
      <LoadingOverlay show={state.isFetching} />
      <div className="flex justify-between">
        <div className="w-4/12">
          <TextInput
            value={state.search}
            placeholder='Cari Berdasarkan User ID atau Name atau Email'
            onChange={methods.handleSearch}
            onClick={methods.onClickSearch}
          />
        </div>
        <div className="w-3/12">
          <Button
            onClick={() => { }}
            type='primary'
            variant='medium'
            customClassName='w-full'
          >
            Tambah
          </Button>
        </div>
      </div>
      <DataTable headers={state.headersData} columns={state.usersData} />
      <div className="my-10 flex justify-center">
        <Pagination
          currentPage={state.page}
          next={methods.counterPage}
          prev={methods.counterPage}
        />
      </div>
    </div>
  )
}

export default Users
