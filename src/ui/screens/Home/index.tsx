import React, { FC, useEffect } from 'react'
import DataTable from '@/components/DataTable/index'
import TextInput from '@/components/TextInput/index'
import Button from '@/components/Button'
import usePostStore from '@/stores/post'
import { shallow } from 'zustand/shallow'
import { PostsResponse } from '@/domain/response'

interface Props {
  posts: PostsResponse[]
  isLoading: boolean
}

const Home: FC<Props> = ({ posts, isLoading = true }) => {
  console.log('posts', posts, isLoading)
  return (
    <div className='flex flex-col gap-3'>
      <div className="flex justify-between">
        <div className="w-3/12">
          <TextInput />
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
      <DataTable />
    </div>
  )
}

export default Home
