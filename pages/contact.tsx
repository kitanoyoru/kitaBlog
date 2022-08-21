// Basic imports
import { useReducer } from "react"

// Types
import type { NextPage } from "next"
import type { FormEvent } from "react"

enum FormActionKind {
  EMAIL = "EMAIL",
  SUBJECT = "SUBJECT",
  CONTENT = "CONTENT"
}

interface FormAction {
  type: FormActionKind
  payload: string
}

interface FormState {
  email: string
  subject: string
  content: string
}

const formReducer = (state: FormState, action: FormAction) => {
  const { type, payload } = action
  switch (type) {
    case FormActionKind.EMAIL:
      return {
        ...state,
        email: payload
      }
    case FormActionKind.CONTENT:
      return {
        ...state,
        content: payload
      }
    case FormActionKind.SUBJECT:
      return {
        ...state,
        subject: payload
      }
    default:
      return state
  }
}

const Contact: NextPage = () => {
  const initialState: FormState = {
    email: "",
    subject: "",
    content: ""
  }
  const [state, dispatch] = useReducer(formReducer, initialState)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    fetch("/api/contact", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(state)
    })
  }

  return (
    <div className="bg-primary max-h-screen">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl font-extrabold text-center text-white">
          Contact me
        </h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-white sm:text-xl">
          Feel free to ask me about something through email or social networks (links in a
          footer).
        </p>
        <form className="space-y-8" onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label className="block mb-2 text-sm font-medium text-white">
              Your email
            </label>
            <input
              id="email"
              className="border border-white text-white bg-primary text-sm rounded-lg block w-full p-2.5"
              onChange={(e) =>
                dispatch({ type: FormActionKind.EMAIL, payload: e.target.value })
              }
              placeholder="name@email.com"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-white">Subject</label>
            <input
              id="subject"
              className="block p-3 w-full text-sm text-white rounded-lg bg-primary border border-white"
              onChange={(e) =>
                dispatch({ type: FormActionKind.SUBJECT, payload: e.target.value })
              }
              placeholder="Let me know how I can help you"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block mb-2 text-sm font-medium text-white">
              Your message
            </label>
            <textarea
              id="message"
              rows={6}
              className="block p-2.5 w-full text-sm font-medium text-white bg-primary rounded-lg border border-white"
              onChange={(e) =>
                dispatch({ type: FormActionKind.CONTENT, payload: e.target.value })
              }
              value={state.content}
            />
          </div>
          <div className="mx-auto flex justify-center mb-6">
            <button
              type="submit"
              className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-secondary sm:w-fi"
            >
              Send message
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Contact
