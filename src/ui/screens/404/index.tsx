import React, { FC } from 'react'

const NotFound: FC = () => {
  return (
    <div className=" bg-slate-200 text-center w-full flex flex-col gap-2 justify-center items-center h-[80vh]">
      <p className='text-4xl'>Oops!</p>
      <p className='text-2xl'>404 - Page Not Found</p>
      <p className='text-lg'>The page you are looking for might have been removed, had its name changed, or temporarily unavailable.</p>
    </div>
  )
}

export default NotFound
