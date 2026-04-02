const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'http://localhost:10002';
const API_BASE = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || `${WP_URL}/wp-json/eyepress/v1`;

interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  date: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
  categories?: {
    nodes: Array<{ name: string; slug: string }>;
  };
  author?: {
    node: { name: string; slug: string };
  };
}

interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  count: number;
}

async function fetchAPI(endpoint: string, params: Record<string, string> = {}) {
  const url = new URL(`${API_BASE}/${endpoint}`);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  const res = await fetch(url.toString(), {
    headers: { 'Content-Type': 'application/json' },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    console.error(`API Error: ${res.status} - ${res.statusText}`);
    throw new Error(`Failed to fetch ${endpoint}`);
  }

  return res.json();
}

export async function getPosts(page = 1, perPage = 12, category?: string): Promise<Post[]> {
  const params: Record<string, string> = {
    page: page.toString(),
    per_page: perPage.toString(),
  };
  if (category) params.category = category;
  return fetchAPI('posts', params);
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    return await fetchAPI(`post/${slug}`);
  } catch {
    return null;
  }
}

export async function getCategories(): Promise<Category[]> {
  return fetchAPI('categories');
}

export async function getCategoryPosts(slug: string, page = 1, perPage = 12) {
  return fetchAPI(`category/${slug}`, { page: page.toString(), per_page: perPage.toString() });
}

export async function getAllPostSlugs(): Promise<string[]> {
  const posts = await getPosts(1, 100);
  return posts.map((p) => p.slug);
}

export { WP_URL };