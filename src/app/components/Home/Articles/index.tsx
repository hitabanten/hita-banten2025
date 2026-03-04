'use client'

import Link from 'next/link'
import Image from 'next/image'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

// 1. IMPORT TIPE DATA DARI UTILS/ARTICLES.TS
import { ArticleMetadata } from '@/utils/articles';

// 2. Gunakan tipe ArticleMetadata yang diimpor
interface BlogProps {
  articles: ArticleMetadata[];
}

const Blog: React.FC<BlogProps> = ({ articles }) => {
  // *** DATA STATIS DIHAPUS, SEKARANG MENGGUNAKAN PROPS: articles ***
  
  const settings = {
    dots: true,

    // Jika articles.length < 3, kita mungkin tidak ingin infinite loop/slider
    infinite: articles.length > 3,
    slidesToShow: 10,
    slidesToScroll: 2,
    arrows: false,
    autoplay: true,
    speed: 500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  }

  return (
    <section id="articles" className="scroll-mt-12 py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="sm:flex justify-between items-center mb-10">
          <h2 className="text-midnight_text mb-5 sm:mb-0 text-3xl font-bold">
            Latest Articles
          </h2>
         {/* <Link
            href="/blog"
            className="text-primary text-lg font-medium hover:underline duration-500">
            View All Articles&nbsp;&gt;
          </Link>  */}
        </div>

        {/* Tambahkan key unik jika perlu di map function, tapi di sini kita pakai index karena data dari MDX kemungkinan tidak punya 'id' */}
        <Slider {...settings}>
          {articles.map((article, index) => (
            // Ganti key={article.id} dengan key={article.slug} atau key={index}
            <div key={article.slug || index} className="px-3">
              <div className="bg-white rounded-xl shadow-md overflow-hidden h-full">
                <div className="relative h-48">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <span>{article.date}</span>
                    <span className="mx-2">•</span>
                    <span>{article.author}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 line-clamp-2">
                    {/* Menggunakan article.slug yang diekstrak dari nama file MDX */}
                    <Link href={`/articles/${article.slug}`} className="hover:text-primary">
                      {article.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  )
}

export default Blog