import fs from "fs"
import path from "path"
import matter from "gray-matter"

const postsDir = path.join(process.cwd(), "src/content/articles")

export function getAllPosts() {
  const files = fs.readdirSync(postsDir)

  return files.map((filename) => {
    const mdx = fs.readFileSync(path.join(postsDir, filename), "utf-8")
    const { data } = matter(mdx)

    return {
      ...data,
      slug: filename.replace(".mdx", "")
    }
  })
}

export function getPostBySlug(slug: string) {
  const filePath = path.join(postsDir, `${slug}.mdx`)
  const file = fs.readFileSync(filePath, "utf-8")

  const { data, content } = matter(file)

  return {
    ...data,
    content,
    slug,
  }
}
