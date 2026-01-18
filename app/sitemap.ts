import type { MetadataRoute } from 'next'

import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? process.env.NEXT_PUBLIC_SITE_URL ?? 'https://livx.org'

const staticRoutes = [
  '/',
  '/about',
  '/projects',
  '/open-calls',
  '/for-partners',
  '/contact',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const items: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: route === '/' ? 1 : 0.7,
  }))

  try {
    const payload = await getPayloadClient()

    const [projects, openCalls] = await Promise.all([
      payload.find({
        collection: 'projects',
        depth: 0,
        limit: 1000,
        select: { slug: true, updatedAt: true },
      }),
      payload.find({
        collection: 'open-calls',
        depth: 0,
        limit: 1000,
        select: { slug: true, updatedAt: true },
      }),
    ])

    const toDate = (value: unknown): Date | undefined => {
      if (value instanceof Date) return value
      if (typeof value === 'string' || typeof value === 'number') return new Date(value)
      return undefined
    }

    for (const doc of projects.docs) {
      if (doc?.slug) {
        items.push({
          url: `${baseUrl}/projects/${doc.slug}`,
          lastModified: toDate(doc.updatedAt) ?? now,
          changeFrequency: 'monthly',
          priority: 0.6,
        })
      }
    }

    for (const doc of openCalls.docs) {
      if (doc?.slug) {
        items.push({
          url: `${baseUrl}/open-calls/${doc.slug}`,
          lastModified: toDate(doc.updatedAt) ?? now,
          changeFrequency: 'weekly',
          priority: 0.6,
        })
      }
    }
  } catch (error) {
    console.warn('Sitemap generation skipped dynamic entries:', error)
  }

  return items
}
