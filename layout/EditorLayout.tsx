// Basic imports
import { useState, useEffect, useContext, createContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import PostService from "../lib/services/PostService";
import AuthService from "../lib/services/AuthService";
import { auth } from "../lib/config/firebase";
import { setLocal } from "../lib/utils/localStorage";

// Types
import type { IPost, IPostUpdate } from "../lib/types";
import type { ReactNode } from "react";
import type { NextPage } from "next";
import type { User } from "firebase/auth";

interface IEditorContext {
  posts: IPost[]
  user: User | null

  login: (email: string, password: string) => void
  createPost: (post: IPost) => void
  deletePost: (post: IPost) => void

  updateCache: () => void
  updatePost: (id: string, post: IPostUpdate, updatePath: string[]) => void; 
}

interface EditorLayoutProps {
  children: React.ReactNode
}

const editorContext = createContext<IEditorContext>({} as IEditorContext);

const EditorLayout: NextPage<EditorLayoutProps> = () => {};

export default EditorLayout;