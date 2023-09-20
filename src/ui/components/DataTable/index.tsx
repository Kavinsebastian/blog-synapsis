import Link from 'next/link'
import React, { FC, useEffect } from 'react'
import { DataTables } from '@/infrastructure/types'
import cx from 'classnames'

interface Props {
  headers: DataTables[]
  columns: DataTables[][]
}

const DataTable: FC<Props> = ({ headers, columns }) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {
              headers.length > 0 && headers.map((item, index) => {
                if (item.type === 'button') {
                  return (
                    <th key={`${item.label}-${index}`} scope="col" className={cx("px-6 py-3", `!max-w-[${item.maxWidth}]`, `!min-w-[${item.minWidth}]`)} style={{ minWidth: `${item.minWidth} !important`, maxWidth: `${item.maxWidth} !important` }}>
                      <span className="sr-only">{item.label}</span>
                    </th>
                  )
                }
                return (
                  <th key={`${item.label}-${index}`} scope="col" className={cx("px-6 py-3", `!max-w-[${item.maxWidth}]`, `!min-w-[${item.minWidth}]`)} style={{ minWidth: `${item.minWidth} !important`, maxWidth: `${item.maxWidth} !important` }}>
                    {item.label}
                  </th>
                )
              })
            }
          </tr>
        </thead>
        <tbody>
          {
            columns.length > 0 && columns.map((column, index) => {
              return (
                <tr key={`${column}-${index}`} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  {
                    column.length > 0 && column.map((col, idx) => {
                      if (col.action && !col.value) {
                        return (
                          <td key={`${col.label}-${idx}`} className={cx("px-6 py-4 text-right", `!max-w-[${col.maxWidth}]`, `!min-w-[${col.minWidth}]`)} style={{ minWidth: `${col.minWidth} !important`, maxWidth: `${col.maxWidth} !important` }}>
                            <Link href={col.action} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">{col.label}</Link>
                          </td>
                        )
                      }
                      return (
                        <td key={`${col.label}-${idx}`} scope="row" className={cx("px-6 py-4 font-medium text-gray-900 dark:text-white", `!max-w-[${col.maxWidth}]`, `!min-w-[${col.minWidth}]`)} style={{ minWidth: `${col.minWidth} !important`, maxWidth: `${col.maxWidth} !important` }}>
                          <p className='text-ellipsis break-words'>{col.value}</p>
                        </td>
                      )
                    })
                  }
                </tr>
              )
            }
            )}
        </tbody>
      </table>
    </div>

  )
}

export default DataTable
