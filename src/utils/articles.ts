import fs from "fs"
import path from "path"
import matter from "gray-matter"

// 🗂 Lokasi folder artikel markdown
const ARTICLES_PATH = path.join(process.cwd(), "src/content/articles")

// 🧩 Tipe data metadata artikel
export interface ArticleMetadata {
  title: string
  date: string
  excerpt: string
  author: string
  image: string
  slug: string
  support_by?: string
  description?: string
}

// 🧠 Ambil semua metadata artikel
export function getAllArticles(): ArticleMetadata[] {
  if (!fs.existsSync(ARTICLES_PATH)) {
    console.warn(`⚠️ Folder artikel tidak ditemukan: ${ARTICLES_PATH}`)
    return []
  }

  const files = fs.readdirSync(ARTICLES_PATH)

  const articles = files
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
    .map((fileName) => {
      const filePath = path.join(ARTICLES_PATH, fileName)
      const fileContent = fs.readFileSync(filePath, "utf8")

      const { data } = matter(fileContent)
      const slug = fileName.replace(/\.mdx?$/, "")

      return {
        title: data.title ?? "Untitled",
        date: data.date ?? "",
        excerpt: data.excerpt || data.description || "",
        author: data.author ?? "Unknown",
        image: data.image ?? "/default-article.jpg",
        slug,
        support_by: data.support_by ?? "",
        description: data.description ?? "",
      } satisfies ArticleMetadata
    })
    // Urutkan dari terbaru ke lama
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return articles
}

// ✅ Kompatibilitas (jika masih ada kode lama yang pakai nama ini)
export function getArticleMetadata(): ArticleMetadata[] {
  return getAllArticles()
}

// 🔍 Fungsi tambahan: ambil artikel lengkap (termasuk content)
export function getArticleBySlug(slug: string) {
  const filePath = path.join(ARTICLES_PATH, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const fileContent = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(fileContent)

  return {
    frontmatter: {
      title: data.title ?? "Untitled",
      date: data.date ?? "",
      author: data.author ?? "Unknown",
      image: data.image ?? "/default-article.jpg",
      support_by: data.support_by ?? "",
      description: data.description ?? "",
    },
    content,
  }
}
