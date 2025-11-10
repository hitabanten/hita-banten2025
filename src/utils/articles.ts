import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// Update path ke lokasi yang benar
const ARTICLES_PATH = path.join(process.cwd(), 'src/content/articles')

export interface ArticleMetadata {
  title: string
  date: string
  description: string
  author: string
  support_by?: string
  slug: string
  image?: string
}

export function getArticleMetadata(): ArticleMetadata[] {
  // Pastikan folder exists
  if (!fs.existsSync(ARTICLES_PATH)) {
    fs.mkdirSync(ARTICLES_PATH, { recursive: true })
    return []
  }

  // 1. Dapatkan semua nama file di direktori
  const fileNames = fs.readdirSync(ARTICLES_PATH)

  // 2. Filter hanya file .mdx
  const mdxFiles = fileNames.filter((fileName) => fileName.endsWith('.mdx'))

  // 3. Baca metadata dari setiap file
  const articles = mdxFiles.map((fileName) => {
    const filePath = path.join(ARTICLES_PATH, fileName)
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(fileContent)

    return {
      title: data.title,
      date: data.date,
      description: data.description,
      author: data.author,
      support_by: data.support_by,
      slug: fileName.replace('.mdx', ''),
      image: data.image,
    }
  })

  // 4. Urutkan berdasarkan tanggal terbaru
  return articles.sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    return dateB.getTime() - dateA.getTime()
  })
}