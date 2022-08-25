// Basic imports
import React, { useRef } from "react"
import AuthService from "../../lib/services/AuthService"
import EditorLayout from "../../layout/EditorLayout"
import { useRouter } from "next/router"
import { useEditor } from "../../layout/EditorLayout"

// Types
import type { NextPageWithLayout } from "../_app"
import type { ReactElement } from "react"
import type { FormEvent } from "react"

interface Input {
  placeholder: string
  type: string
  label: string
  ref: React.MutableRefObject<HTMLInputElement>
}

const Login: NextPageWithLayout = () => {
  const { login } = useEditor()
  const router = useRouter()

  const emailRef = useRef() as React.MutableRefObject<HTMLInputElement>
  const passwordRef = useRef() as React.MutableRefObject<HTMLInputElement>

  const inputs: Input[] = [
    {
      placeholder: "example@mail.com",
      type: "email",
      label: "Email",
      ref: emailRef
    },
    {
      placeholder: "password",
      type: "password",
      label: "Password",
      ref: passwordRef
    }
  ]

  const validatePasswordInput = () => {
    const password = passwordRef.current.value
    if (password.trim().length < 6) {
      return false
    }
    return true
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()

    const email = emailRef.current.value
    const password = passwordRef.current.value

    const isValid = validatePasswordInput()
    if (isValid) {
      login(email, password)
    }
  }

  return (
    <div className="bg-primary w-full text-white min-h-screen flex justify-center items-center p-5 sm:p-0">
      <div className="w-96">
        <h1 className="text-white text-center text-4xl font-bold">Welcome</h1>
        <form onSubmit={onSubmit}>
          {inputs.map(({ label, placeholder, type, ref }, index) => {
            return (
              <div className="group mt-3" key={index}>
                <label className="text-sm text-whte">{label}</label>
                <input
                  className="w-full border-white outline-none mt-3 bg-secondary py-5 px-6 rounded-md transition-all"
                  type={type}
                  placeholder={placeholder}
                  ref={ref}
                  required
                />
              </div>
            )
          })}
          <button className="mt-10 bg-secondary w-full py-5 rounded-md hover:ring-4 transition-all">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

Login.getLayout = (page: ReactElement) => {
  return <EditorLayout>{page}</EditorLayout>
}

export default Login
