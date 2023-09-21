import { UserResponse } from '@/domain/response'
import Button from '@/ui/components/Button'
import { useRouter } from 'next/router'
import React, { FC } from 'react'

interface Props {
  user: UserResponse
}

const User: FC<Props> = ({ user }) => {
  const router = useRouter()

  return (
    <div className='max-w-md mx-auto flex flex-col gap-3'>
      <div className='border p-4 grid grid-cols-6 text-black-base gap-y-4'>
        <p>Name </p>
        <p>:</p>
        <p className='col-span-4'>{user.name}</p>

        <p>Email </p>
        <p>: </p>
        <p className='col-span-4'>{user.email}</p>

        <p>Gender </p>
        <p>: </p>
        <p className='col-span-4'>{user.gender}</p>

        <p>Status </p>
        <p>: </p>
        <p className='col-span-4'>{user.status}</p>
      </div>
      <Button
        onClick={() => { router.push(router.asPath + '/update') }}
        type='primary'
        variant='medium'
        customClassName='w-full'
      >
        Update
      </Button>
    </div>

  )
}

export default User
