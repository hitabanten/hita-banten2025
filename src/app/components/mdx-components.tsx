import Image from "next/image";
import VideoPlayer from "./VideosPlayer";
import Link from "next/link";

// Optional: highlight code with prism or rehype deps sesuai setup kamu
// Kalau nanti perlu syntax highlight > bilang ya, aku bantu setting

const mdxComponents = {
  // Custom MDX elements
  VideoPlayer,

  // Override default HTML tags styling
  img: (props: any) => (
    <Image
      {...props}
      alt={props.alt ?? "image"}
      width={1000}
      height={600}
      className="rounded-lg border shadow-sm my-4"
    />
  ),

  a: (props: any) => (
    <Link
      {...props}
      className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
    />
  ),

  code: (props: any) => (
    <code
      {...props}
      className="bg-gray-800 text-gray-100 px-2 py-1 rounded text-sm"
    />
  ),

  pre: (props: any) => (
    <pre
      {...props}
      className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm my-4"
    />
  ),

  h1: (props: any) => <h1 {...props} className="text-3xl font-bold mt-6 mb-4" />,
  h2: (props: any) => <h2 {...props} className="text-2xl font-semibold mt-6 mb-4" />,
  h3: (props: any) => <h3 {...props} className="text-xl font-semibold mt-4 mb-2" />,

  ul: (props: any) => <ul {...props} className="list-disc ml-6 my-4" />,
  ol: (props: any) => <ol {...props} className="list-decimal ml-6 my-4" />,

  blockquote: (props: any) => (
    <blockquote
      {...props}
      className="border-l-4 pl-4 italic text-gray-600 dark:text-gray-300"
    />
  ),
};

export default mdxComponents;
