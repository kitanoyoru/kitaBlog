// Basic imports
import Link from "next/link";
import Image from "next/image";
import IndexSEO from "../components/SEO/IndexSEO";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

// Types
import type { NextPage } from "next";
import type { GetStaticProps } from "next";
import type { Post } from "../lib/types";

import staticPost from "../lib/static";

interface IndexProps {
  posts: Post[]
}

const Index: NextPage<IndexProps> = ({ posts }) => {
  const heroPost = posts[0];

  return (
    <>
      <IndexSEO />
      
    </>
  );  
};

export const getStaticProps: GetStaticProps = async (context) => {
  const posts: Post[] = staticPost;

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
};

export default Index;
