// Basic imports
import React, { useRef } from "react"
import AuthService from "../../lib/services/AuthService"
import { useRouter } from "next/router"

// Types
import type { NextPage } from "next"
import type { FormEvent } from "react"

interface Input {
  placeholder: string
  type: string
  label: string
  ref: React.MutableRefObject<HTMLInputElement>
}

const Login: NextPage = () => {
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
      AuthService.loginUser(email, password)
      router.push("/editor")
    }
  }

  return (
    <div className="bg-primary w-full min-h-screen flex justify-center items-center p-5 sm:p-0">
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
          <button className="mt-10 bg-secondary w-full py-5 rounded-md hover:ring-4 transition-all text-white">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
