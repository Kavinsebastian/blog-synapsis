import React, { ChangeEventHandler, FC, Fragment } from 'react'
import Button from '../Button'
import SearchIcon from '@/ui/assets/images/svg/SearchIcon'
import cx from 'classnames'

interface Props {
  value: string
  placeholder?: string
  useButton?: boolean
  useIconSearch?: boolean
  customClass?: string
  id?: string
  type?: string
}

interface Actions {
  onChange: ChangeEventHandler<HTMLInputElement>
  onClick?: () => void
}

const TextInput: FC<Props & Actions> = ({
  value,
  placeholder = '',
  useButton = true,
  useIconSearch = true,
  customClass,
  type = 'search',
  id = 'default-search',
  onChange,
  onClick
}) => {
  return (
    <Fragment>
      <label htmlFor={id} className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          {
            useIconSearch && (
              <SearchIcon className='w-4 h-4 text-gray-500 dark:text-gray-400' />
            )
          }
        </div>
        <input
          value={value}
          type={type}
          id={id}
          className={cx(
            "block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none",
            customClass
          )}
          placeholder={placeholder}
          onChange={onChange}
        />
        {
          useButton && onClick && (
            <Button
              onClick={onClick}
              type='primary'
              variant='small'
              customClassName='text-white absolute right-2.5 bottom-2.5'
            >
              Search
            </Button>
          )
        }
      </div>
    </Fragment>
  )
}

export default TextInput
