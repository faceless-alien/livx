import { notFound } from 'next/navigation'
import { unstable_cache } from 'next/cache'

import { asText, getPayloadClient } from '@/lib/payload'

export const revalidate = 60

function formatProjectLocation(location: unknown) {
  if (!location || typeof location !== 'object') return ''
  const record = location as Record<string, unknown>
  const city = typeof record.city === 'string' ? record.city : ''
  const country = typeof record.country === 'string' ? record.country : ''
  return [city, country].filter(Boolean).join(', ')
}

function formatProjectStatus(status: unknown) {
  if (status === 'upcoming') return 'Upcoming'
  if (status === 'ongoing') return 'Ongoing'
  if (status === 'completed') return 'Completed'
  return 'Project'
}

const getProjectBySlugOrId = unstable_cache(
  async (slugOrId: string) => {
    const payload = await getPayloadClient()

    const result = await payload.find({
      collection: 'projects',
      limit: 1,
      where: {
        slug: {
          equals: slugOrId,
        },
      },
    })

    const bySlug = result.docs[0] as Record<string, unknown> | undefined
    if (bySlug) return bySlug

    try {
      const byId = (await payload.findByID({
        collection: 'projects',
        id: slugOrId,
      })) as unknown as Record<string, unknown>
      return byId
    } catch {
      return undefined
    }
  },
  ['livx-project-by-slug-or-id'],
  { revalidate: 60 },
)

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const slugOrId = decodeURIComponent(slug)
  const doc = await getProjectBySlugOrId(slugOrId)

  if (!doc) return notFound()

  const title = asText(doc.title) || 'Untitled project'
  const summary = asText(doc.summary)
  const status = formatProjectStatus(doc.status)
  const location = formatProjectLocation(doc.location)

  return (
    <div className="bg-mist">
      <div className="mx-auto max-w-[1280px] px-6 py-16 md:py-24">
        <div className="max-w-4xl">
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">{status}</div>

          <h1 className="mt-4 text-4xl md:text-5xl font-serif font-bold uppercase tracking-[0.14em] text-ink">
            {title}
          </h1>

          {location ? (
            <div className="mt-4 text-sm uppercase tracking-[0.12em] text-muted">{location}</div>
          ) : null}

          {summary ? (
            <p className="mt-10 text-lg text-deep/80 leading-relaxed">{summary}</p>
          ) : (
            <p className="mt-10 text-lg text-deep/80 leading-relaxed">—</p>
          )}
        </div>
      </div>
    </div>
  )
}
