export const setLocal = (key: string, value: any) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(key, JSON.stringify(value))
  }
}

export const readLocal = (key: string) => {
  if (typeof window !== "undefined") {
    return JSON.parse(window.localStorage.getItem(key)!)
  }
}

export const clearLocal = (key?: string) => {
  if (typeof window !== "undefined") {
    if (key) {
      window.localStorage.removeItem(key)
    } else {
      window.localStorage.clear()
    }
  }
}
