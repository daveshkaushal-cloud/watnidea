import type { MetadataRoute } from 'next'
import { site, SERVICES, getVerifiedCaseStudies } from '@/lib/siteContent'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const base = site.url.replace(/\/$/, '')

  const routes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/work`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/insights`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/book-strategy-call`, lastModified: now, changeFrequency: 'yearly', priority: 0.8 },
    { url: `${base}/privacy-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]

  for (const s of SERVICES) {
    routes.push({
      url: `${base}${s.route}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    })
  }

  for (const c of getVerifiedCaseStudies()) {
    routes.push({
      url: `${base}/work/${c.slug}`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.6,
    })
  }

  return routes
}
