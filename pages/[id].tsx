// Default imports
import Image from "next/image"
import Markdown from "../components/Markdown"
import staticPost from "../lib/static"

// Types
import type { GetStaticPaths, GetStaticProps } from "next"
import type { Post } from "../lib/types"
import type { NextPage } from "next"

interface DetailedPostProps {
  post: Post
}

const DetailedPost: NextPage<DetailedPostProps> = ({ post }) => {
  return (
    <>
      <Markdown content={post.content} className="text-white language-javascript" />
    </>
  )
}

export const getStaticPaths = async (context: any) => {
  const posts: Post[] = staticPost
  const paths = posts.map((post) => {
    return {
      params: {
        id: post.id.toString()
      }
    }
  })

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const post: Post = staticPost[0]

  return {
    props: {
      post
    }
  }
}

export default DetailedPost
