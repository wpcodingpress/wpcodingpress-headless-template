# WPCodingPress Headless Template

A premium, production-ready Next.js template for headless WordPress websites. 

## Features

- ⚡ **Next.js 15** with App Router
- 🎨 **Tailwind CSS** for styling
- 🌙 **Dark Mode** support
- 📱 **Fully Responsive**
- 🚀 **SEO Optimized**
- ✨ **Beautiful UI Components**
- 🔗 **WordPress API Integration**

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables:
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your WordPress site URL:
   ```
   NEXT_PUBLIC_WORDPRESS_URL=https://your-wordpress-site.com
   NEXT_PUBLIC_WORDPRESS_API_URL=https://your-wordpress-site.com/wp-json/eyepress/v1
   ```

3. Run development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000)

## Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Render
1. Connect your GitHub repository
2. Set environment variables
3. Deploy

## WordPress Plugin Required

This template requires the [WPCodingPress Headless Connector](https://github.com/wpcodingpress/WPCodingPress/tree/main/wordpress-plugin) plugin installed on your WordPress site.

## Customization

- Edit `tailwind.config.ts` for colors and styling
- Modify `src/components/` for UI components
- Update `src/lib/api.ts` for API configuration

## License

MIT