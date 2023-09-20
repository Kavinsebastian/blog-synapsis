import React, { FC } from 'react'
import { PostsResponse } from '@/domain/response'
import useHooks from './hooks'
import TextInput from '@/ui/components/TextInput'
import Button from '@/ui/components/Button'
import DataTable from '@/ui/components/DataTable'
import LoadingOverlay from '@/ui/components/LoadingOverlay'
import Pagination from '@/ui/components/Pagination'

interface Props {
  posts: PostsResponse[]
  isLoading: boolean
}

const Home: FC<Props> = ({ posts, isLoading = true }) => {
  const { state, methods } = useHooks({ posts, isLoading })

  return (
    <div className='flex flex-col gap-3'>
      <LoadingOverlay show={state.isFetching} />
      <div className="flex justify-between">
        <div className="w-3/12">
          <TextInput
            value={state.search}
            placeholder='Cari Berdasarkan User ID atau Title'
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
      <DataTable headers={state.headersData} columns={state.postsData} />
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

export default Home
