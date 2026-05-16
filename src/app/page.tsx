import AdaptiveTemplate from '@/components/templates/AdaptiveTemplate'
import {
  getSiteDataFromEnv,
  getSiteDataUrl,
  hasSiteData,
  fetchSiteDataFromUrl,
  createDefaultSiteData,
} from '@/lib/site-data'

export const dynamic = 'force-dynamic'

export default async function Home() {
  let siteData = getSiteDataFromEnv()

  if (!siteData) {
    const dataUrl = getSiteDataUrl()
    if (dataUrl) {
      siteData = await fetchSiteDataFromUrl(dataUrl)
    }
  }

  if (!siteData) {
    siteData = createDefaultSiteData(process.env.NEXT_PUBLIC_SITE_NAME || undefined)
  }

  if (!siteData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚙️</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">No Site Data Available</h1>
          <p className="text-gray-500 text-sm mb-4">
            Deploy your site through the WPCodingPress dashboard to see your content here.
          </p>
          <div className="text-xs text-gray-400">
            Set NEXT_PUBLIC_SITE_DATA or NEXT_PUBLIC_SITE_DATA_URL environment variables.
          </div>
        </div>
      </div>
    )
  }

  return <AdaptiveTemplate site={siteData} siteName={process.env.NEXT_PUBLIC_SITE_NAME || undefined} />
}
