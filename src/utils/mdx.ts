import fs from 'fs';
import path from 'path';
import { serialize } from 'next-mdx-remote/serialize';
import matter from 'gray-matter';

const ARTICLES_PATH = path.join(process.cwd(), 'public', 'articles');

export function getAllPostSlugs() {
  return fs
    .readdirSync(ARTICLES_PATH)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''));
}

export async function getPostBySlug(slug: string) {
  const fullPath = path.join(ARTICLES_PATH, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const serialized = await serialize(content, { scope: data });

  return {
    ...serialized, // ✅ ini memberi compiledSource & scope
    frontmatter: data,
  };
}
