import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";
import NotFoundPage from "./404";
import Post from '@/ui/screens/Post'
import { getPostApiService, getCommentPostApiService } from "@/infrastructure/services/post";
import { AxiosError } from "axios";
import { getUserApiService } from "@/infrastructure/services/user";
import { PostDataDetail } from "@/infrastructure/types";

interface Props {
  postId?: number
  postData?: PostDataDetail
}

const DynamicPage: NextPage<Props> = ({
  postId,
  postData
}) => {

  if (postId) {
    return (
      <Fragment>
        <Head>
          <title>Post | THE BLOG.</title>
        </Head>
        <Post id={postId} data={postData} />
      </Fragment>
    )
  }

  return (
    <Fragment>
      <Head>
        <title>404 Page | THE BLOG. </title>
      </Head>
      <NotFoundPage />
    </Fragment>
  )
}

export const getServerSideProps: GetServerSideProps = async (props) => {
  const paths = (props.resolvedUrl.split('/')?.filter((s: string) => s !== '') || []) as string[]

  if (paths[0] === 'post' && paths.length === 2) {
    let post;
    let comments;
    let user;
    try {
      post = await getPostApiService(Number(paths[1]))
      comments = await getCommentPostApiService(Number(paths[1]))
      if (post) {
        user = await getUserApiService(post.userId)
      }

    } catch (error) {
      if (error instanceof AxiosError) {
        console.log('err', error)
      }
    }

    return {
      props: {
        postId: Number(paths[1]),
        postData: {
          post: {
            title: post?.title ?? '',
            body: post?.body ?? ''
          },
          comments,
          user: {
            name: user?.name ?? '',
            email: user?.email ?? '',
            gender: user?.gender ?? ''
          }
        }
      }
    }
  }

  return {
    props: {}
  }
}

export default DynamicPage
