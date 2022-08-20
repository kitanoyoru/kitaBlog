import { Timestamp } from "firebase/firestore"

export type Post = {
  id: string
  imageUrl?: string
  title: string
  content: string
  createdAt: Timestamp | string
}
