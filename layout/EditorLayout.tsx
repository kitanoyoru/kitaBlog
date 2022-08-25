// Basic imports
import { useState, useEffect, useContext, createContext } from "react"
import { onAuthStateChanged } from "firebase/auth"
import PostService from "../lib/services/PostService"
import AuthService from "../lib/services/AuthService"
import { auth } from "../lib/config/firebase"
import { useRouter } from "next/router"
import { setLocal } from "../lib/utils/localStorage"
import revalidatePosts from "../lib/utils/revalidatePosts"

// Types
import type { IPost, IPostUpdate } from "../lib/types"
import type { ReactNode } from "react"
import type { NextPage } from "next"
import type { User } from "firebase/auth"

interface IEditorContext {
  posts: IPost[]
  user: User | null

  login: (email: string, password: string) => void
  createPost: (post: IPost) => void
  deletePost: (id: string) => void

  updateCache: () => void
  updatePost: (id: string, post: IPostUpdate, updatePath: string[]) => void
}

interface EditorLayoutProps {
  children: ReactNode
}

const editorContext = createContext<IEditorContext>({} as IEditorContext)

const EditorLayout: NextPage<EditorLayoutProps> = ({ children }) => {
  const router = useRouter()

  const [posts, setPosts] = useState<IPost[]>([])
  const [user, setUser] = useState<User | null>(null)

  const login = async (email: string, password: string) => {
    await AuthService.loginUser(email, password)
    setLocal("auth", "true")
    await router.push("/editor")
  }
  const createPost = async (post: IPost) => {
    await PostService.createPost(post)
    setPosts((posts) => [post, ...posts])
    await updateCache()
    await router.push("/editor")
  }
  const deletePost = async (id: string) => {}
  const updateCache = async (paths = ["/"]) => {
    await revalidatePosts(process.env.REVALIDATE_TOKEN!, paths)
  }
  const updatePost = async (id: string, post: IPostUpdate, updatePath: string[]) => {}

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        PostService.listPosts()
          .then((posts) => {
            setPosts(posts)
          })
          .catch((e) => {
            console.log(e.toString())
          })
      } else {
        router.push("/editor/login")
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <editorContext.Provider
      value={{
        posts,
        user,
        login,
        createPost,
        deletePost,
        updateCache,
        updatePost
      }}
    >
      <div className="min-h-screnn w-full bg-primary">{children}</div>
    </editorContext.Provider>
  )
}

export default EditorLayout
