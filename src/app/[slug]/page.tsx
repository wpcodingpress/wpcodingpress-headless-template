import { getPost, getAllPostSlugs } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, ArrowLeft, Share2, Bookmark } from 'lucide-react';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  let slugs: string[] = [];
  try {
    slugs = await getAllPostSlugs();
  } catch {
    slugs = [];
  }
  
  return slugs.map((slug) => ({ slug }));
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  let post = null;

  try {
    post = await getPost(slug);
  } catch (error) {
    console.error('Failed to fetch post:', error);
  }

  if (!post) {
    notFound();
  }

  const imageUrl = post.featuredImage?.node?.sourceUrl || '/placeholder.jpg';

  return (
    <>
      <Navbar />
      
      <article className="min-h-screen bg-gray-50 dark:bg-dark-900 pt-24 pb-16">
        <div className="container-custom">
          {/* Back Link */}
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 mb-8 dark:text-gray-400"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          {/* Post Header */}
          <header className="max-w-4xl mx-auto mb-12">
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
              {post.author?.node?.name && (
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {post.author.node.name}
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center gap-4">
              <button className="p-2 rounded-lg bg-gray-100 hover:bg-primary-100 transition-colors dark:bg-dark-800">
                <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
              <button className="p-2 rounded-lg bg-gray-100 hover:bg-primary-100 transition-colors dark:bg-dark-800">
                <Bookmark className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </header>

          {/* Featured Image */}
          <div className="relative h-[400px] md:h-[600px] rounded-2xl overflow-hidden mb-12">
            <Image
              src={imageUrl}
              alt={post.featuredImage?.node?.altText || post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Post Content */}
          <div className="max-w-4xl mx-auto">
            <div 
              className="prose prose-lg dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </article>

      <Footer />
    </>
  );
}