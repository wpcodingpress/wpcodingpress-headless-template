import { getCategoryPosts, getCategories } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PostCard from '@/components/PostCard';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  let categories: any[] = [];
  try {
    categories = await getCategories();
  } catch {
    categories = [];
  }
  
  return categories.map((cat) => ({ slug: cat.slug }));
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  let posts: any[] = [];
  let categoryName = slug;

  try {
    const result = await getCategoryPosts(slug);
    posts = result.posts || result || [];
  } catch (error) {
    console.error('Failed to fetch category posts:', error);
  }

  // Try to get category name from categories list
  try {
    const categories = await getCategories();
    const cat = categories.find((c: any) => c.slug === slug);
    if (cat) categoryName = cat.name;
  } catch {}

  return (
    <>
      <Navbar />
      
      <section className="pt-32 pb-16 bg-gray-50 dark:bg-dark-900">
        <div className="container-custom">
          <div className="text-center mb-12">
            <Link 
              href="/"
              className="text-primary-600 hover:text-primary-700 mb-4 inline-block"
            >
              ← Back to Home
            </Link>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {categoryName}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {posts.length} articles in this category
            </p>
          </div>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 dark:text-gray-400">
                No posts found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}