interface ContactData {
  email: string
  subject: string
  content: string
}

const fetchContactAPI = async (data: ContactData) => {
  const code = await fetch("/api/contact", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then((res) => res.status)

  return code
}

export default fetchContactAPI
