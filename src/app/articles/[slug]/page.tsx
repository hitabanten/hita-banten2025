import React from "react"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import { getPostBySlug, getAllPostSlugs } from "@/utils/mdx"
import VideoPlayer from "@/app/components/VideosPlayer"

export async function generateStaticParams() {
  const slugs = getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

type Props = {
  params: Promise<{ slug: string }>
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const { compiledSource, frontmatter } = post

  return (
    <article className="py-10">
      <div className="container">
        <h1 className="text-4xl font-bold mb-3">{frontmatter.title}</h1>
        <p className="text-gray-500 text-sm mb-6">
          {frontmatter.date} — {frontmatter.author}
        </p>

        {frontmatter.image && (
          <img
            src={frontmatter.image}
            alt={frontmatter.title}
            className="rounded-xl mb-6 w-full max-h-[400px] object-cover"
          />
        )}

        <div className="prose dark:prose-invert max-w-none">
          {/* casting ke any untuk menghindari error tipe TS sementara */}
          <MDXRemote
            source={compiledSource as any}
            components={{
              VideoPlayer,
            }}
          />
        </div>
      </div>
    </article>
  )
}
