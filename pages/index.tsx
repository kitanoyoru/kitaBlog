// Basic imports
import Link from "next/link"
import Image from "next/image"
import IndexSEO from "../components/SEO/IndexSEO"
import PostService from "../lib/services/PostService"
import { HiOutlineArrowNarrowRight } from "react-icons/hi"
import revalidatePosts from "../lib/utils/revalidatePosts"

// Types
import type { NextPage } from "next"
import type { GetStaticProps } from "next"
import type { IPost } from "../lib/types"

interface IndexProps {
  posts: IPost[]
}

const Index: NextPage<IndexProps> = ({ posts }) => {
  const heroPost = posts[0]

  return (
    <>
      <IndexSEO />
      <div className="bg-primary p-5 xl:p-0 min-h-screen w-full">
        <div className="max-w-7xl pt-20 pb-36 mx-auto">
          <button
            className="mb-10 bg-secondary text-white p-5 rounded-lg"
            onClick={() => {
              revalidatePosts(process.env.REVALIDATE_TOKEN!)
            }}
          >
            Revalidate
          </button>
          <Link href={`/${heroPost.id}`}>
            <div className="bg-secondary rounded-md cursor-pointer p-5 mb-10 h-96 py-20 sm:px-20 flex flex-col sm:flex-row justify-around items-center gap-20 group hover:ring-4 ring-white transition-all">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white">
                  {heroPost.title}
                </h1>
                <p className="text-lg mt-2 text-white">{heroPost.createdAt as string}</p>
              </div>
              <div>
                <div className="flex items-center gap-10">
                  <h1 className="text-xl font-bold text-white">Read more</h1>
                  <HiOutlineArrowNarrowRight className="text-white text-4xl group-hover:translate-x-2 transition-all" />
                </div>
              </div>
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-white block mb-8">My other posts:</h1>
          <div className="flex flex-wrap justify-between  gap-10 rounded-md">
            {posts.slice(1).map((post, index) => {
              return (
                <Link href={`/${post.id}`} key={index}>
                  <div className="w-96 group cursor-pointer">
                    <div className="w-full h-80 relative group-hover:ring-2 ring-white transition-all">
                      <Image
                        src={heroPost.imageUrl}
                        alt={heroPost.title}
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                        className="rounded-md"
                      />
                    </div>
                    <h1 className="text-white text-2xl font-bold mt-2">{post.title}</h1>
                    <p className="text-sm text-white">{post.createdAt as string}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const posts: IPost[] = await PostService.listPosts()

  if (!posts.length) {
    return {
      redirect: {
        permanent: false,
        destination: "/404"
      }
    }
  }

  return {
    props: {
      posts
    }
  }
}

export default Index
