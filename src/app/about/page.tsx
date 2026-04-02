import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <>
      <Navbar />
      
      <section className="pt-32 pb-20 bg-gray-50 dark:bg-dark-900 min-h-screen">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
              About WPCodingPress
            </h1>
            
            <div className="prose prose-lg dark:prose-invert">
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                WPCodingPress is a powerful platform that transforms your WordPress website 
                into a stunning headless Next.js application with just one click.
              </p>
              
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                Why Choose WPCodingPress?
              </h2>
              <ul className="space-y-4 text-gray-600 dark:text-gray-400">
                <li>🚀 Blazing fast performance with Next.js</li>
                <li>🎨 Beautiful, modern premium templates</li>
                <li>🔒 Enterprise-grade security</li>
                <li>🌍 Global CDN deployment</li>
                <li>📱 Fully responsive designs</li>
                <li>🔧 Easy customization</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                Our Mission
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                We believe that everyone deserves access to premium, high-performance websites. 
                Our mission is to democratize headless WordPress development by making it 
                accessible to everyone through automation and intuitive tools.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                Key Features
              </h2>
              <ul className="space-y-4 text-gray-600 dark:text-gray-400">
                <li>• <strong>One-Click Conversion:</strong> Transform your WordPress site in minutes</li>
                <li>• <strong>Automatic Sync:</strong> Keep your content synchronized automatically</li>
                <li>• <strong>SEO Optimized:</strong> Built-in SEO optimization for better rankings</li>
                <li>• <strong>Analytics:</strong> Track your site performance with built-in analytics</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}