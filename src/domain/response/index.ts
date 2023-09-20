export interface PostsResponse {
  body: string
  id: number
  title: string
  userId: number
}

export interface PostResponse {
  id: number
  userId: number
  title: string
  body: string
}

export interface PostCommentResponse {
  id: number
  postId: number
  name: string
  email: string
  body: string
}

export interface UserResponse {
  id: number
  name: string
  email: string
  gender: string
  status: string
}
