import React, { FC } from 'react'
import ChevronIcon from '@/ui/assets/images/svg/ChevronIcon'

interface Props {
  currentPage: number
}

interface Actions {
  next: (page: number) => void
  prev: (page: number) => void
}

const Pagination: FC<Props & Actions> = ({
  currentPage = 1,
  next,
  prev,
}) => {
  return (
    <div className='flex justify-between gap-5 items-center'>
      <div onClick={() => next(currentPage - 1)} className="p-2 bg-slate-100 rounded-lg cursor-pointer transition-all duration-100 active:mr-2">
        <ChevronIcon color='#1a1919' customClassName='rotate-90' />
      </div>
      <p className='text-black-base font-semibold'>{currentPage}</p>
      <div onClick={() => prev(currentPage + 1)} className="p-2 bg-slate-100 rounded-lg cursor-pointer transition-all duration-100 active:ml-2">
        <ChevronIcon color='#1a1919' customClassName='-rotate-90' />
      </div>
    </div>
  )
}

export default Pagination
