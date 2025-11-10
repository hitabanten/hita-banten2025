import { getPostBySlug, getAllPostSlugs } from '@/utils/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';

type Params = {
  slug: string;
};

type PageProps = {
  params: Promise<Params>;
};

// ✅ Generate static paths
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

// ✅ Page utama
export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { compiledSource, frontmatter } = post;

  return (
    <article className="prose mx-auto px-4 py-8">
      {/* Judul */}
      <h1 className="text-3xl font-bold mb-4">{frontmatter.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        {frontmatter.date} — {frontmatter.author}
      </p>

      {/* Gambar header */}
      {frontmatter.image && (
        <div className="rounded-xl overflow-hidden shadow mb-8">
          <img
            src={frontmatter.image}
            alt={frontmatter.title}
            className="w-full object-cover"
          />
        </div>
      )}

      {/* Render konten MDX */}
      <div className="prose max-w-none">
        <MDXRemote source={compiledSource} />
      </div>

      {/* Jika ada video */}
      {frontmatter.video && (
        <div className="mt-8">
          <video
            src={frontmatter.video}
            controls
            className="rounded-xl shadow-md w-full"
          />
        </div>
      )}

      <div className="mt-12 border-t pt-6 text-sm text-gray-400">
        <p>{frontmatter.description}</p>
      </div>
    </article>
  );
}
