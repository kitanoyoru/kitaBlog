// Basic imports
import { useEffect, useState } from "react"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { CgDanger, CgCheckO } from "react-icons/cg"

// Types
import type { FC } from "react"
import type { IconType } from "react-icons"
import { AlertEnum, IAlert } from "../lib/types"

interface AlertProps {
  alert: IAlert
}

type AlertStyles = {
  [key in AlertEnum]: {
    ring: string
    Icon: IconType
  }
}

const ALERT_TIMEOUT = 5000

const Alert: FC<AlertProps> = ({ alert }) => {
  const [open, setOpen] = useState(false)
  const { type, message } = alert

  useEffect(() => {
    setOpen(true)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setOpen(false), ALERT_TIMEOUT)
    return () => clearTimeout(timer)
  }, [alert])

  const alertStyles: AlertStyles = {
    [AlertEnum.ERROR]: {
      ring: "ring-red-500",
      Icon: CgDanger
    },
    [AlertEnum.LOADING]: {
      ring: "ring-white-500",
      Icon: AiOutlineLoading3Quarters
    },
    [AlertEnum.SUCCESS]: {
      ring: "ring-green-500",
      Icon: CgCheckO
    }
  }

  const { ring, Icon } = alertStyles[type]

  return open ? (
    <div
      className={`mt-5 w-86 ring-2 ${ring} text-white flex justify-center items-center place-content-center h-14 rounded-md transition-all bg-secondary px-2 duration-700`}
    >
      <Icon className={`mr-3 ${type == AlertEnum.LOADING ? "animate-spin" : ""}`} />
      <h1 className="w-full text-sm">{` ${message}`}</h1>
    </div>
  ) : (
    <></>
  )
}

export default Alert
