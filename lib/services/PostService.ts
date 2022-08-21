// Basic imports
import {
  setDoc,
  doc,
  getDocs,
  getDoc,
  query,
  collection,
  orderBy,
  updateDoc,
  deleteDoc,
} from "firebase/firestore"
import { db } from "../config/firebase"

// Types
import type { IPost, IPostUpdate } from "../types"
import type { Timestamp } from "firebase/firestore";

class PostService {
  static createPost(post: IPost) {
    return setDoc(doc(db, "posts", post.id), post)
  }

  static async listPosts() {
    const snapshot = await getDocs(
      query(collection(db, "posts"), orderBy("createdAt", "asc"))
    )
    const posts: IPost[] = []

    snapshot.forEach((doc) => {
      const data = doc.data() as IPost;
      const id = data.id;
      const createdAt = data.createdAt as Timestamp;

      posts.push({
        ...data,
        id,
        createdAt: new Date(createdAt.toDate()).toDateString()
      })
    })

    return posts
  }

  static async getPost(id: string) {
    const docRef = doc(db, "posts", id)
    const snapshot = await getDoc(docRef)

    if (snapshot.exists()) {
      const data = snapshot.data() as IPost
      const id = data.id;
      const createdAt = data.createdAt as Timestamp 


      return {
        ...data,
        id,
        createdAt: new Date(createdAt.toDate()).toDateString()
      } 
    }

    return {}
  }

  static async updatePost(postId: string, object: IPostUpdate) {
    const postRef = doc(db, "posts", postId)
    await updateDoc(postRef, object)
  }

  static async deletePost(postId: string) {
    const postRef = doc(db, "posts", postId)
    await deleteDoc(postRef)
  }
}

export default PostService
