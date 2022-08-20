// Basic imports
import Link from "next/link"

// Types
import type { FC } from "react"

const Header: FC = () => {
  return (
    <div className="bg-primary px-5 py-10 sm:py-16 mx-auto max-w-7xl h-10 flex justify-between items-center">
      <div className="text-white">
        <Link href="/">
          <a className="text-3xl font-bold">kitaBlog</a>
        </Link>
      </div>
      <nav className="text-white ml-9 sm:ml-9 flex items-center justify-center">
        <Link href="/about">
          <div className="group cursor-pointer">
            <h1 className="sm:text-xl text-sm font-semibold cursor-pointer mx-5">
              About
            </h1>
            <div className="group-hover:h-px mt-2 bg-white group-hover:w-full w-0 transition-all"></div>
          </div>
        </Link>
        <Link href="/contact">
          <div className="group cursor-pointer">
            <h1 className="sm:text-xl text-sm font-semibold cursor-pointer mx-5">
              Contact
            </h1>
            <div className="group-hover:h-px mt-2 bg-white group-hover:w-full w-0 transition-all"></div>
          </div>
        </Link>
      </nav>
    </div>
  )
}

export default Header
