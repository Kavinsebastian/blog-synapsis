import { PostsResponse } from "@/domain/response";
import Home from "@/ui/screens/Home";
import { AxiosError } from "axios";
import { GetServerSideProps, NextPage } from "next";
import { getPostsApiService } from "@/infrastructure/services/post";

interface Props {
  posts: PostsResponse[],
  isLoading: boolean
}

const Root: NextPage<Props> = ({ posts, isLoading }) => {
  return (
    <Home posts={posts} isLoading={isLoading} />
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  let result: PostsResponse[] = [];
  let isLoading = true
  try {
    const response = await getPostsApiService()
    if (!response) throw Error

    result = response
  } catch (error: unknown) {
    if (error instanceof AxiosError)
      console.log('DEBUG ERROR: ', error.response?.status)
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
