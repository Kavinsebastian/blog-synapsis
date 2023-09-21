import Link from 'next/link'
import React, { FC } from 'react'
import { DataTables } from '@/infrastructure/types'
import cx from 'classnames'
import useHooks from './hooks'

interface Props {
  headers: DataTables[]
  columns: DataTables[][]
  onClick?: (label: string, id?: number) => void
}

const DataTable: FC<Props> = ({ headers, columns, onClick }) => {
  const { methods } = useHooks({ onClick })
  return (
    <div className="relative overflow-x-auto">
      <table className="text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {
              headers.length > 0 && headers.map((item, index) => {
                if (item.type === 'button') {
                  return (
                    <th key={`${item.label}-${index}`} scope="col" className={cx("px-6 py-3", `custom-width-header-${index}`, index === headers.length - 1 || index === 0 ? "rounded-tr-lg" : "")}>
                      <span className="sr-only">{item.label}</span>
                      <style jsx>{
                        `.custom-width-header-${index} {
                          max-width: ${item.maxWidth}px;
                          min-width: ${item.minWidth}px;
                      }`}
                      </style>
                    </th>
                  )
                }
                return (
                  <th key={`${item.label}-${index}`} scope="col" className={cx("px-6 py-3", `custom-width-header-${index}`, index === headers.length - 1 || index === 0 ? "rounded-tl-lg" : "")}>
                    {item.label}
                    <style jsx>{
                      `.custom-width-header-${index} {
                          max-width: ${item.maxWidth}px;
                          min-width: ${item.minWidth}px;
                      }`}
                    </style>
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
                          <td key={`${col.label}-${idx}`} className={cx("px-6 py-4 text-right")}>
                            <Link
                              href={col.action === '#' ? '' : col.action}
                              onClick={() => { methods.handleClick(col.label, col.id, Boolean(col.action === '#')) }}
                              className={cx(
                                "font-medium text-blue-600 dark:text-blue-500 hover:underline",
                                col.customClass
                              )}
                            >{col.label}</Link>
                          </td>
                        )
                      }
                      return (
                        <td key={`${col.label}-${idx}`} scope="row" className={cx("px-6 py-4 font-medium text-gray-900 dark:text-white")}>
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
    </div >

  )
}

export default DataTable
