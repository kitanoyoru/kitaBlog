// Basic imports
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Markdown from "../components/Markdown"
import { HiOutlineArrowNarrowLeft } from "react-icons/hi"
import { Timestamp } from "firebase/firestore"
import { useRouter } from "next/router"
import { uid } from "uid"
import PostService from "../lib/services/PostService"
import { clearLocal, readLocal, setLocal } from "../lib/utils/localStorage"

// Types
import type { ReactElement } from "react"
import type { MutableRefObject } from "react"
import type { NextPage } from "next"
import type { IPost, IPostUpdate } from "../lib/types"

const Editor: NextPage = () => {
  const draftPost: IPostUpdate = readLocal("draftPost")
  const [error, setError] = useState("")
  const [isPreview, setIsPreview] = useState(false)

  const contentRef = useRef() as MutableRefObject<HTMLTextAreaElement>
  const titleRef = useRef() as MutableRefObject<HTMLInputElement>
  const imageRef = useRef() as MutableRefObject<HTMLInputElement>

  const router = useRouter()

  const handleCreatePost = async () => {
    const id = uid(16)
    const { title, content, imageUrl } = readNewPostValues()
    const createdAt = Timestamp.fromDate(new Date())

    if (validate(title, content)) {
      const newPost = { id, title, content, createdAt, imageUrl } as IPost
      await PostService.createPost(newPost)
    }
  }

  const readNewPostValues = () => {
    const title = titleRef.current.value
    const content = contentRef.current.value
    const imageUrl = imageRef.current.value

    return { title, content, imageUrl }
  }

  const onChangeField = () => {
    const { title, content, imageUrl } = readNewPostValues()
    setLocal("draft", { title, imageUrl, content })
  }

  const validate = (title: string, content: string): boolean => {
    if (title.trim().length < 10) {
      setError("Title is too short.")
      return false
    } else if (content.trim().length < 30) {
      setError("Content is too short.")
      return false
    }
    setError("")

    return true
  }

  const clearDraftPost = () => {
    const { content, title, imageUrl } = readNewPostValues()
    if (content || title || imageUrl) {
      const shouldClear = window.confirm("Are you sure?")
      if (shouldClear) {
        clearLocal("draft")
        titleRef.current.value = ""
        contentRef.current.value = ""
        imageRef.current.value = ""
      }
    }
  }

  const shouldPreviewMarkdown = isPreview && contentRef.current.value

  return (
    <div className="text-white max-w-4xl mx-auto pb-28">
      <input
        type="text"
        className="w-full bg-secondary p-5 rounded-md outline-none transition-all mb-5"
        placeholder="Title"
        ref={titleRef}
        onChange={onChangeField}
        defaultValue={draftPost?.title}
      />
      <input
        type="text"
        className="w-full bg-secondary p-5 rounded-md outline-none transition-all mt-5"
        placeholder="Image link"
        ref={imageRef}
        onChange={onChangeField}
        defaultValue={draftPost?.imageUrl}
      />
      <textarea
        ref={contentRef}
        className={`${
          shouldPreviewMarkdown ? "hidden" : ""
        } resize-none w-full bg-secondary mt-5 h-100 rounded-md outline-none transition-all leading-relaxed tracking-wide break-words`}
        placeholder="Post content as markdown"
        onChange={onChangeField}
        defaultValue={draftPost?.content}
      />
      <Link href="/">
        <div className="flex items-start gap-10 group cursor-pointer mt-20">
          <HiOutlineArrowNarrowLeft className="text-4xl group-hover:translate-x-1 transition-all" />
          <h1 className="text-xl font-semibold transition-all duration-1000">
            Back to home.
          </h1>
        </div>
      </Link>
    </div>
  )
}

export default Editor
