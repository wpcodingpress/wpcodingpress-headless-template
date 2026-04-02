import { getPosts, getCategories } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import PostCard from '@/components/PostCard';
import Footer from '@/components/Footer';

export default async function Home() {
  let posts: any[] = [];
  let categories: any[] = [];

  try {
    posts = await getPosts(1, 12);
  } catch (error) {
    console.error('Failed to fetch posts:', error);
  }

  try {
    categories = await getCategories();
  } catch (error) {
    console.error('Failed to fetch categories:', error);
  }

  return (
    <>
      <Navbar />
      <Hero />
      
      {/* Posts Grid */}
      <section className="py-20 bg-gray-50 dark:bg-dark-900">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Latest Articles
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Explore our latest posts and stay updated with the newest content.
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
                No posts found. Please connect your WordPress site.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="py-16 bg-white dark:bg-dark-800">
          <div className="container-custom">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Browse by Category
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((cat) => (
                <a
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  className="px-6 py-3 bg-gray-100 hover:bg-primary-100 text-gray-700 hover:text-primary-700 rounded-full font-medium transition-colors dark:bg-dark-700 dark:hover:bg-primary-900/30 dark:text-gray-300 dark:hover:text-primary-400"
                >
                  {cat.name}
                  <span className="ml-2 text-sm opacity-70">({cat.count})</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}