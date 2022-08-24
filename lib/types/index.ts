import type { Timestamp } from "firebase/firestore"

export type IPost = {
  id: string
  imageUrl: string
  title: string
  content: string
  createdAt: Timestamp | string
}

export type IPostUpdate = {
  id?: string
  imageUrl?: string
  title?: string
  content?: string
  createdAt?: Timestamp | string
}

export type IAlert = {
  message: string
  type: AlertEnum
}

export enum AlertEnum {
  ERROR = "error",
  SUCCESS = "success",
  LOADING = "loading"
}
