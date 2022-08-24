// Basic imports
import Image from "next/image"
import AboutSEO from "../components/SEO/AboutSEO"

// Types
import type { NextPage } from "next"

const About: NextPage = () => {
  return (
    <>
      <AboutSEO />
      <div className="py-36 max-w-4xl mx-auto grid sm:grid-cols-2 grid-cols-1 p-5">
        <div className="sm:flex sm:flex-col sm:justify-center">
          <h1 className="text-4xl font-semibold text-white">Alexandr Rutkovskij</h1>
          <p className="mt-5 text-lg text-white">
            Computer science student and full-stack developer.
          </p>
        </div>
        <div>
          <div className="relative h-96 mt-5 sm:mt-0 w-full sm:w-72 mx-auto border-white border-2">
            <Image
              src="/profile.jpg"
              alt="profile"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              priority
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default About
