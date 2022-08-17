// Basic imports
import { FaGithub, FaTwitter, FaTelegram } from "react-icons/fa"

// Types
import type { FC } from "react"
import type { IconType } from "react-icons"
import Link from "next/link"

type Socials = Array<{ Icon: IconType; link: string }>

const Footer: FC = () => {
  const socials: Socials = [
    {
      Icon: FaTwitter,
      link: "https://twitter.com/kitanoyoru_"
    },
    {
      Icon: FaTelegram,
      link: ""
    },
    {
      Icon: FaGithub,
      link: "https://github.com/kitanoyoru"
    }
  ]
  const socialsLength = socials.length

  return (
    <footer className="bg-primary text-white border-t border-t-white p-4 w-full">
      <div className="mx-auto mt-10 md:flex md:items-center md:justify-between md:p-6 w-3/5">
        <span className="text-sm sm:text-center">
          © 2022{" "}
          <Link href="/">
            <a className="hover:underline">kitaBlog</a>
          </Link>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm sm:mt-0">
          {socials.map(({ link, Icon }, index) => {
            if (index < socialsLength - 1) {
              return (
                <li className="mr-5" key={index}>
                  <a href={link} target="_blank" rel="noreferrer">
                    <Icon className="text-xl" />
                  </a>
                </li>
              )
            } else {
              return (
                <li key={index}>
                  <a href={link} target="_blank" rel="noreferrer">
                    <Icon className="text-xl" />
                  </a>
                </li>
              )
            }
          })}
        </ul>
      </div>
    </footer>
  )
}

export default Footer