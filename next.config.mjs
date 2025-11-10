import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
      }
    ],
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [[rehypeRaw, { passThrough: ['mdxJsxFlowElement'] }]],
    providerImportSource: "@mdx-js/react",
  },
})

export default withMDX(nextConfig)