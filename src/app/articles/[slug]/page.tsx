import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import { getAllArticles, getArticleBySlug } from "@/utils/articles"
import VideoPlayer from "@/app/components/VideosPlayer"

// ✅ Generate semua slug untuk build static
export async function generateStaticParams() {
  const articles = getAllArticles()
  return articles.map((article) => ({ slug: article.slug }))
}

// ✅ Patch untuk bug Next.js 15 (params dianggap Promise)
export default async function ArticlePage(props: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await props.params
  const article = getArticleBySlug(slug)

  if (!article) notFound()

  const { frontmatter, content } = article

  return (
    <section className="min-h-screen bg-gray-50 py-16">
      <div className="container max-w-3xl">
        <article className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
          <h1 className="text-4xl font-bold text-gray-900 mb-3 leading-tight">
            {frontmatter.title}
          </h1>
          <p className="text-gray-500 text-sm mb-6">
            {frontmatter.date} — {frontmatter.author}
          </p>

          {frontmatter.image && (
            <img
              src={frontmatter.image}
              alt={frontmatter.title}
              className="rounded-xl mb-8 w-full max-h-[420px] object-cover"
            />
          )}

          <div className="prose prose-lg max-w-none text-gray-800">
            <MDXRemote
              source={content}
              components={{
                VideoPlayer,
              }}
            />
          </div>
        </article>
      </div>
    </section>
  )
}
