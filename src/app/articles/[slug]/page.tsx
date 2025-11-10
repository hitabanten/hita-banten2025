import { getPostBySlug, getAllPostSlugs } from "@/utils/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import VideoPlayer from "@/app/components/VideosPlayer";
import mdxComponents from "@/app/components/mdx-components"


const mdxComponents = {
  VideoPlayer,
};

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function Page({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const { compiledSource, frontmatter } = post;

  return (
    <article className="prose mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{frontmatter.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        {frontmatter.date} — {frontmatter.author}
      </p>

      {frontmatter.image && (
        <div className="rounded-xl overflow-hidden shadow mb-8">
          <img src={frontmatter.image} alt={frontmatter.title} className="w-full object-cover"/>
        </div>
      )}

      <div className="prose max-w-none">
        <MDXRemote source={compiledSource} components={mdxComponents} />
      </div>

      {frontmatter.video && (
        <div className="mt-8">
          <video src={frontmatter.video} controls className="rounded-xl shadow-md w-full" />
        </div>
      )}

      <div className="mt-12 border-t pt-6 text-sm text-gray-400">
        <p>{frontmatter.description}</p>
      </div>
    </article>
  );
}
