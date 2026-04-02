import Link from 'next/link';
import { ArrowRight, Zap, Shield, Globe } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900 py-20 md:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-200 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6 dark:bg-primary-900/30 dark:text-primary-300">
            <Zap className="w-4 h-4" />
            Blazing Fast Headless WordPress
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Transform Your WordPress
            <span className="text-gradient block mt-2">Into Premium Headless</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
            Create stunning, high-performance websites with Next.js. 
            Lightning-fast, SEO-optimized, and fully customizable.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/" className="btn-primary group">
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/about" className="btn-secondary">
              Learn More
            </Link>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <div className="p-6 bg-white rounded-2xl shadow-sm dark:bg-dark-800">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4 dark:bg-primary-900/30">
                <Zap className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Lightning Fast</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Built on Next.js with edge deployment for sub-second load times.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow-sm dark:bg-dark-800">
              <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mb-4 dark:bg-accent-900/30">
                <Shield className="w-6 h-6 text-accent-600 dark:text-accent-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">SEO Optimized</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Full SEO support with meta tags, sitemaps, and structured data.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow-sm dark:bg-dark-800">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 dark:bg-green-900/30">
                <Globe className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Global CDN</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Deploy worldwide with automatic CDN caching and optimization.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}