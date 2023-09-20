import { PostCommentResponse } from "@/domain/response"

export type DataTables = {
  label: string
  value?: string | number
  action?: string
  type?: string,
  maxWidth: number
  minWidth: number
}

export type User = {
  email: string
  name: string
  gender: string
}

export type Post = {
  title: string
  body: string
}

export type PostDataDetail = {
  post: Post
  user: User
  comments: PostCommentResponse[]
}