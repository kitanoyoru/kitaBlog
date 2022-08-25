// Basic imports
import Link from "next/link"
import Markdown from "../../components/Markdown"
import Alert from "../../components/Alert"
import EditorLayout from "../../layout/EditorLayout"
import { useRouter } from "next/router"
import { HiOutlineArrowNarrowLeft } from "react-icons/hi"
import { Timestamp } from "firebase/firestore"
import { uid } from "uid"
import { clearLocal, readLocal, setLocal } from "../../lib/utils/localStorage"
import { AiOutlineClear } from "react-icons/ai"
import { ReactElement, useEffect, useRef, useState } from "react"
import { useEditor } from "../../layout/EditorLayout"

// Types
import { IAlert, AlertEnum } from "../../lib/types"
import type { MutableRefObject } from "react"
import type { NextPageWithLayout } from "../_app"
import type { IPost, IPostUpdate } from "../../lib/types"

const Editor: NextPageWithLayout = () => {
  const { createPost, user } = useEditor()
  const router = useRouter()
  const draftPost: IPostUpdate = readLocal("draftPost")

  const [alert, setAlert] = useState<IAlert>({ type: AlertEnum.ERROR, message: "" })
  const [error, setError] = useState("")
  const [isPreview, setIsPreview] = useState(false)

  const contentRef = useRef() as MutableRefObject<HTMLTextAreaElement>
  const titleRef = useRef() as MutableRefObject<HTMLInputElement>
  const imageRef = useRef() as MutableRefObject<HTMLInputElement>

  const handleCreatePost = () => {
    const id = uid(16)
    const { title, content, imageUrl } = readNewPostValues()
    const createdAt = Timestamp.fromDate(new Date())

    if (validate(title, content)) {
      const newPost = { id, title, content, createdAt, imageUrl } as IPost
      try {
        createPost(newPost)
        setAlert({ type: AlertEnum.SUCCESS, message: "Post was successfully created." })
      } catch (err) {
        setAlert({ type: AlertEnum.ERROR, message: "Post was not created." })
      }
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
    setLocal("draftPost", { title, imageUrl, content })
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
        clearLocal("draftPost")
        titleRef.current.value = ""
        contentRef.current.value = ""
        imageRef.current.value = ""
      }
    }
  }

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [])

  const shouldPreviewMarkdown = isPreview && contentRef.current.value

  return (
    <div className="text-white min-h-screen p-5 max-w-4xl mx-auto mt-20 pb-28">
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
      <div className="mt-10 flex items-center justify-between">
        <div className="flex gap-5 items-center">
          <AiOutlineClear
            className="text-2xl cursor-pointer hover:scale-110 transition-all"
            onClick={clearDraftPost}
          />
          <button
            className="hover:ring-2 transition-all rounded-md hover:ring-white bg-secondary px-3 py-2"
            onClick={() => setIsPreview(!isPreview)}
          >
            {shouldPreviewMarkdown ? "Edit" : "Preview"}
          </button>
        </div>
        <button
          className="ring-2 ring-white bg-secondary hover:scale-105 transition-all rounded-md px-5 py-2"
          onClick={handleCreatePost}
        >
          Create post
        </button>
      </div>
      {shouldPreviewMarkdown && (
        <Markdown content={contentRef.current.value || ""} className="" />
      )}
      <textarea
        ref={contentRef}
        className={`${
          shouldPreviewMarkdown ? "hidden" : ""
        } resize-none w-full bg-secondary p-10 mt-5 h-100 rounded-md outline-none transition-all leading-relaxed tracking-wide break-words`}
        placeholder="Post content as markdown"
        onChange={onChangeField}
        defaultValue={draftPost?.content}
      />
      {alert.message && <Alert alert={alert} />}
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

Editor.getLayout = (page: ReactElement) => {
  return <EditorLayout>{page}</EditorLayout>
}

export default Editor
