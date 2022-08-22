const revalidatePosts = async (token: string) => {
  return fetch("/api/revalidate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ token })
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
}

export default revalidatePosts
