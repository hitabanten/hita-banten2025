import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

const postsDirectory = path.join(process.cwd(), 'src/content/articles')

export async function getPostBySlug(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`)

  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data: frontmatter, content } = matter(fileContents)

    const { content: compiledSource } = await compileMDX({
      source: content,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [[rehypeRaw, { passThrough: ['mdxJsxFlowElement'] }]],
        },
      },
    })

    return {
      compiledSource,
      frontmatter,
    }
  } catch (error) {
    return null
  }
}

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .filter(fileName => fileName.endsWith('.mdx'))
    .map(fileName => fileName.replace(/\.mdx$/, ''))
}