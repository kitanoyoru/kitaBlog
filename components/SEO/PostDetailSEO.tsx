// Basic imports
import Head from "next/head"

// Types
import type { FC } from "react"

interface PostDetailSEO {
  title: string
  description: string
}

const PostDetailSEO: FC<PostDetailSEO> = ({ title, description }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content="kitanoyoru" />
    </Head>
  )
}

export default PostDetailSEO
