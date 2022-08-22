// Basic imports
import PostService from "../../lib/services/PostService"

// Types
import type { NextApiRequest, NextApiResponse } from "next"

const RevalidateHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.body.token !== process.env.REVALIDATE_TOKEN) {
    return res.status(401).json({ message: "Invalid token." })
  }

  try {
    const paths = await PostService.listPosts().then((posts) =>
      posts.map((post) => `/${post.id}`)
    )
    paths.push("/")
    const promises: Promise<any>[] = []
    paths.forEach((path) => promises.push(res.revalidate(path)))
    Promise.all(promises).then(() => res.json({ revalidated: true }))
  } catch (err) {
    return res.status(500).send("Error revalidating")
  }
}

export default RevalidateHandler
