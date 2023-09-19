import { PostsResponse } from "@/domain/response";
import { getPosts } from "@/services/post";
import usePostStore from "@/stores/post";
import Home from "@/ui/screens/Home";
import { AxiosError } from "axios";
import { GetServerSideProps, NextPage } from "next";

interface Props {
  posts?: PostsResponse[],
  isLoading: boolean
}

const Root: NextPage<Props> = ({ posts, isLoading }) => {
  return (
    <Home posts={posts} isLoading={isLoading} />
  )
}


export const getServerSideProps: GetServerSideProps = async () => {
  let result;
  let isLoading = true
  try {
    const response = await getPosts()
    result = response
    usePostStore.getState().setPosts(response)
  } catch (error: unknown) {
    if (error instanceof AxiosError)
      console.log('err', error.response?.status)
  } finally {
    isLoading = false
  }

  return {
    props: {
      posts: result,
      isLoading
    }
  }
}

export default Root
