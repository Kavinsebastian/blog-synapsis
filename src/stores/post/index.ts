import { create } from 'zustand'

interface PostState {
  posts: []
}

interface PostActions {
  setPosts: (posts: any) => void
}

const usePostStore = create<PostState & PostActions>((set) => ({
  posts: [],
  setPosts: (posts) => set((state) => {
    console.log('store', posts)
    return {
      ...state,
      posts: posts
    }
  })
}))

export default usePostStore