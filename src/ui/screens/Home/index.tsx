import React from 'react'
import DataTable from '@/components/DataTable/index'
import TextInput from '@/components/TextInput/index'
import Button from '@/components/Button'

export default function Home() {
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
