import { Post } from "../types"

const md = `
~~~js
console.log("Its not work!");
~~~

# Some text
`
const staticPost: Post[] = [
  {
    id: "0",
    title: "How I build my site",
    content: md,
    createdAt: new Date().toDateString(),
    imageUrl:
      "https://images.unsplash.com/photo-1657299156791-44140a28a518?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=8"
  }
]

export default staticPost
