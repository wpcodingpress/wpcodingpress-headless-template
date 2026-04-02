import { getPosts, getCategories, isWordPressConfigured } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import PostCard from '@/components/PostCard';
import Footer from '@/components/Footer';

const DEMO_POSTS = [
  {
    id: 1,
    title: 'Welcome to Your New Site',
    slug: 'welcome',
    content: 'This is a demo post. Connect your WordPress site to see your actual content.',
    excerpt: 'Get started with your new headless WordPress site.',
    date: new Date().toISOString(),
    featuredImage: { node: { sourceUrl: 'https://placehold.co/600x400/2563eb/white?text=Demo+Post', altText: 'Demo' } },
    categories: { nodes: [{ name: 'Getting Started', slug: 'getting-started' }] },
    author: { node: { name: 'Admin', slug: 'admin' } },
  },
  {
    id: 2,
    title: 'Connect Your WordPress',
    slug: 'connect-wordpress',
    content: 'Configure your WordPress URL in the environment variables to fetch your content.',
    excerpt: 'Learn how to connect your WordPress site.',
    date: new Date().toISOString(),
    featuredImage: { node: { sourceUrl: 'https://placehold.co/600x400/16a34a/white?text=Connect', altText: 'Connect' } },
    categories: { nodes: [{ name: 'Tutorial', slug: 'tutorial' }] },
    author: { node: { name: 'Admin', slug: 'admin' } },
  },
  {
    id: 3,
    title: 'Explore Features',
    slug: 'explore-features',
    content: 'This template supports categories, tags, custom post types, and more.',
    excerpt: 'Discover all the features available.',
    date: new Date().toISOString(),
    featuredImage: { node: { sourceUrl: 'https://placehold.co/600x400/9333ea/white?text=Features', altText: 'Features' } },
    categories: { nodes: [{ name: 'Features', slug: 'features' }] },
    author: { node: { name: 'Admin', slug: 'admin' } },
  },
];

const DEMO_CATEGORIES = [
  { id: 1, name: 'Getting Started', slug: 'getting-started', count: 1 },
  { id: 2, name: 'Tutorial', slug: 'tutorial', count: 1 },
  { id: 3, name: 'Features', slug: 'features', count: 1 },
];

export default async function Home() {
  const configured = isWordPressConfigured();
  let posts: any[] = [];
  let categories: any[] = [];
  let error = '';

  if (configured) {
    try {
      posts = await getPosts(1, 12);
    } catch (e) {
      error = e instanceof Error ? e.message : 'Failed to fetch posts';
      console.error('Failed to fetch posts:', e);
    }

    if (!error) {
      try {
        categories = await getCategories();
      } catch (e) {
        console.error('Failed to fetch categories:', e);
      }
    }
  }

  if (!configured || error) {
    posts = DEMO_POSTS;
    categories = DEMO_CATEGORIES;
  }

  const showNotice = !configured || !!error;

  return (
    <>
      <Navbar />
      {showNotice && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border-b border-amber-200 dark:border-amber-800">
          <div className="container-custom py-3">
            <p className="text-amber-800 dark:text-amber-200 text-sm text-center">
              {error ? (
                <>Demo mode: {error}. Showing sample content.</>
              ) : (
                <>Demo mode: WordPress not connected. Set NEXT_PUBLIC_WORDPRESS_URL environment variable to connect your site.</>
              )}
            </p>
          </div>
        </div>
      )}
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