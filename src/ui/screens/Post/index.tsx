import { PostDataDetail } from '@/infrastructure/types'
import LoadingOverlay from '@/ui/components/LoadingOverlay'
import React, { FC } from 'react'
interface Props {
  id: number
  data?: PostDataDetail
}
const Post: FC<Props> = ({ id, data }) => {

  if (!data) {
    return (
      <div className="">Data Not Found!</div>
    )
  }

  return (
    <div className='max-w-6xl mx-auto flex gap-5 flex-col text-black-base'>
      <div className="text-center">
        <p className='text-3xl font-bold text-black-base italic'>{data.post.title}</p>
      </div>
      <div className="flex flex-col gap-1 text-sm font-semibold">
        <p>{data.user.name}</p>
        <p>{data.user.email}</p>
        <p>{data.user.gender}</p>
      </div>
      <div className="">
        <p>{data.post.body}</p>
      </div>

      <div className="mt-5 flex flex-col gap-2 max-w-xl">
        <p>Comments.</p>
        <hr />

        {
          data.comments.length > 0 && data.comments.map((item, index) => {
            return (
              <div key={`${item.id}-${index}`} className="py-2 px-4 border rounded-lg shadow-sm">
                <div className="flex gap-2 mb-2">
                  <p className='font-bold truncate sm:whitespace-nowrap text-ellipsis'>{item.name}</p>
                  <p className='font-semibold truncate break-all'>&lt;{item.email}&gt;</p>
                </div>
                <p className='text-md'>{item.body}</p>
              </div>
            )
          })
        }

      </div>
    </div>
  )
}
export default Post
