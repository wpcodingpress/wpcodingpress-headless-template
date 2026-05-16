import type { NormalizedSiteData } from '@/types/content-schema'

function createDefaultSiteData(siteName?: string): NormalizedSiteData {
  return {
    settings: {
      name: siteName || 'My Website',
      description: 'A premium headless WordPress site powered by WPCodingPress.',
      url: '',
      language: 'en',
      logo: null,
      favicon: null,
      timezone: 'UTC',
      dateFormat: 'F j, Y',
      socialLinks: [],
      seo: {
        title: siteName || 'My Website',
        description: 'Welcome to our website.',
        ogImage: '',
        noIndex: false,
      },
    },
    navigation: [
      {
        id: 'primary-1',
        name: 'Primary',
        location: 'primary',
        items: [
          { id: 'nav-1', label: 'Home', url: '/', target: '_self', children: [], order: 0 },
          { id: 'nav-2', label: 'About', url: '/about', target: '_self', children: [], order: 1 },
          { id: 'nav-3', label: 'Contact', url: '/contact', target: '_self', children: [], order: 2 },
        ],
      },
    ],
    posts: [],
    pages: [],
    categories: [],
    tags: [],
    authors: [],
    hero: {
      title: 'Welcome',
      subtitle: '',
      description: 'Connect your WordPress site to see your actual content here.',
      backgroundImage: null,
      backgroundVideo: null,
      ctaPrimary: { label: 'Get Started', url: '#' },
      ctaSecondary: { label: 'Learn More', url: '/about' },
      layout: 'centered',
    },
    services: [],
    portfolio: [],
    products: [],
    testimonials: [],
    team: [],
    faqs: [],
    gallery: [],
    stats: [],
    cta: {
      title: 'Ready to Get Started?',
      description: 'Connect your WordPress site and transform it into a blazing-fast headless website.',
      buttonLabel: 'Get Started',
      buttonUrl: '#',
      backgroundType: 'color',
      backgroundValue: '',
    },
    contact: {
      email: 'support@example.com',
      phone: '+1 (555) 123-4567',
      address: '123 Main Street, City, Country',
      latitude: 0,
      longitude: 0,
      formFields: [
        { type: 'text', label: 'Name', required: true, placeholder: 'Your name' },
        { type: 'email', label: 'Email', required: true, placeholder: 'your@email.com' },
        { type: 'textarea', label: 'Message', required: true, placeholder: 'Your message...' },
      ],
    },
    newsletter: {
      title: 'Stay Updated',
      description: 'Subscribe to our newsletter for the latest updates.',
      buttonLabel: 'Subscribe',
      placeholder: 'Enter your email',
    },
    footer: {
      copyright: `© ${new Date().getFullYear()} All rights reserved.`,
      description: 'Powered by WPCodingPress Headless.',
      socialLinks: [],
      columns: [
        {
          title: 'Quick Links',
          links: [
            { label: 'Home', url: '/' },
            { label: 'About', url: '/about' },
            { label: 'Contact', url: '/contact' },
          ],
        },
      ],
      branding: {
        logo: null,
        name: siteName || 'My Website',
        tagline: 'Premium Headless WordPress',
      },
    },
    media: [],
  }
}

export async function fetchSiteData(): Promise<NormalizedSiteData | null> {
  const dataUrl = process.env.NEXT_PUBLIC_SITE_DATA_URL
  if (dataUrl) {
    try {
      const cacheBuster = `?t=${Date.now()}`
      const res = await fetch(`${dataUrl}${cacheBuster}`, {
        next: { revalidate: 30 },
      })
      if (res.ok) {
        const json = await res.json()
        if (json?.site) {
          return json.site as NormalizedSiteData
        }
      }
    } catch {
      console.warn('[SiteData] Failed to fetch from URL')
    }
  }

  const raw = process.env.NEXT_PUBLIC_SITE_DATA
  if (raw) {
    try {
      return JSON.parse(raw) as NormalizedSiteData
    } catch {
      console.warn('[SiteData] Failed to parse NEXT_PUBLIC_SITE_DATA env var')
    }
  }

  return null
}

export { createDefaultSiteData }
