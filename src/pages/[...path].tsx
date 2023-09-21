import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";
import NotFoundPage from "./404";
import Post from '@/ui/screens/Post'
import { getPostApiService, getCommentPostApiService } from "@/infrastructure/services/post";
import { AxiosError } from "axios";
import { getUserApiService } from "@/infrastructure/services/user";
import { PostDataDetail } from "@/infrastructure/types";
import User from '@/ui/screens/Users/User'
import { UserResponse } from "@/domain/response";
import UserEdit from '@/ui/screens/Users/UserEdit'
import UserCreate from "@/ui/screens/Users/UserCreate";

interface Props {
  postId?: number
  postData?: PostDataDetail
  userData?: UserResponse
  isUserEdit?: boolean
  isUserCreate?: boolean
}

const DynamicPage: NextPage<Props> = ({
  postId,
  postData,
  userData,
  isUserEdit,
  isUserCreate
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

  if (userData && !isUserEdit) {
    return (
      <Fragment>
        <Head>
          <title>User | THE BLOG.</title>
        </Head>
        <User user={userData} />
      </Fragment>
    )
  }

  if (isUserEdit && userData) {
    return (
      <Fragment>
        <Head>
          <title>User | THE BLOG.</title>
        </Head>
        <UserEdit user={userData} />
      </Fragment>
    )
  }

  if (isUserCreate) {
    return (
      <Fragment>
        <Head>
          <title>User | THE BLOG.</title>
        </Head>
        <UserCreate />
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
        console.log('DEBUG ERROR: ', error)
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

  if (paths[0] === 'users' && paths[1] === 'create') {
    return {
      props: {
        isUserCreate: true
      }
    }
  }

  if (paths[0] === 'users' && !isNaN(Number(paths[1])) && paths.length === 2) {
    let user;
    try {
      user = await getUserApiService(Number(paths[1]))

    } catch (error) {
      if (error instanceof AxiosError) {
        console.log('DEBUG ERROR: ', error)
      }
    }

    return {
      props: {
        userData: user
      }
    }
  }

  if (paths[0] === 'users' && paths.length === 3 && paths[2] === 'update') {
    let user;
    try {
      user = await getUserApiService(Number(paths[1]))

    } catch (error) {
      if (error instanceof AxiosError) {
        console.log('DEBUG ERROR: ', error)
      }
    }

    return {
      props: {
        userData: user,
        isUserEdit: true
      }
    }
  }

  return {
    props: {

    }
  }
}

export default DynamicPage
