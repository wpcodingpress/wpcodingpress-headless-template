'use client'

import type { NormalizedSiteData } from '@/types/content-schema'

interface AdaptiveLayoutProps {
  site: NormalizedSiteData
  children: React.ReactNode
}

export default function AdaptiveLayout({
  site,
  children,
}: AdaptiveLayoutProps) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  )
}
