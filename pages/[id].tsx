// Default imports
import Image from "next/image"
import Markdown from "../components/Markdown"
import staticPost from "../lib/static"
import PostDetailSEO from "../components/SEO/PostDetailSEO"

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
      <PostDetailSEO title={post.title} description={post.content.slice(0, 100)} />
      <div className="min-h-screen bg-primary w-full pt-10">
        <div className="p-5 max-w-4xl mx-auto">
          <h1 className="text-5xl text-white font-semibold">{post.title}</h1>
          <p className="text-lg text-white mt-5">{post.createdAt as string}</p>
        </div>
        <div className="max-w-5xl mx-auto">
          <div className="w-full h-99 mt-10 mb-10 rounded-md relative transition-all">
            <Image
              src={post.imageUrl!}
              alt={post.title}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              className="rounded-md"
              priority
            />
          </div>
        </div>
        <div className="p-5 sm:p-0 w-full sm:max-w-4xl mx-auto">
          <Markdown content={post.content} className="bg-none sm:p-5 text-white" />
        </div>
      </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async (context: any) => {
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
