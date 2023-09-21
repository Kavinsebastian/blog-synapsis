import { PostCommentResponse } from "@/domain/response"

export type DataTables = {
  id?: number,
  label: string
  value?: string | number
  action?: string
  type?: string,
  customClass?: string
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

export interface DropdownOption {
  label: string;
  value: string | number;
}
