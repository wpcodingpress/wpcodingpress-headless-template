'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User } from 'lucide-react';

interface PostCardProps {
  post: {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    date: string;
    featuredImage?: { node: { sourceUrl: string; altText: string } };
    author?: { node: { name: string } };
  };
}

export default function PostCard({ post }: PostCardProps) {
  const imageUrl = post.featuredImage?.node?.sourceUrl || '/placeholder.jpg';
  const altText = post.featuredImage?.node?.altText || post.title;

  return (
    <article className="card overflow-hidden group">
      <Link href={`/${post.slug}`} className="block">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={imageUrl}
            alt={altText}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </Link>
      
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {new Date(post.date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'short', 
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
        
        <Link href={`/${post.slug}`}>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors line-clamp-2 mb-2">
            {post.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
          {post.excerpt || 'No description available'}
        </p>
        
        <Link 
          href={`/${post.slug}`}
          className="inline-flex items-center text-primary-600 font-medium mt-4 hover:text-primary-700"
        >
          Read More →
        </Link>
      </div>
    </article>
  );
}