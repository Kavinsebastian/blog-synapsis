import NotFound from '@/ui/screens/404'
import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'

const NotFoundPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>404 Page | THE BLOG. </title>
      </Head>
      <NotFound />
    </>
  )
}

export default NotFoundPage
