import { asText, getPayloadClient } from '@/lib/payload'
import ProjectsClient from './ProjectsClient'

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

export default async function Projects() {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'projects',
    limit: 50,
    sort: '-createdAt',
  })

  const projects = result.docs.map((doc: unknown) => {
    const record = doc as Record<string, unknown>
    const idValue = record.id
    const id = String(idValue)

    const rawSlug = record.slug
    const slug =
      typeof rawSlug === 'string' && rawSlug.trim().length > 0 ? rawSlug.trim() : id

    const rawStartDate = record.startDate
    const year = rawStartDate ? new Date(String(rawStartDate)).getFullYear() : undefined

    const rawThemes = record.themes
    const tags = Array.isArray(rawThemes)
      ? rawThemes
          .map((item) => {
            if (!item || typeof item !== 'object') return ''
            const theme = (item as Record<string, unknown>).theme
            return asText(theme)
          })
          .filter(Boolean)
      : []

    return {
      id,
      slug,
      title: asText(record.title) || 'Untitled project',
      status: formatProjectStatus(record.status),
      location: formatProjectLocation(record.location),
      year,
      summary: asText(record.summary),
      tags,
    }
  })

  return (
    <div className="bg-mist">
      <div className="mx-auto max-w-[1280px] px-6 py-16 md:py-24">
        <div className="flex items-start justify-between gap-10">
          <div className="max-w-3xl" id="top">
            <h1 className="text-4xl md:text-5xl font-serif font-bold uppercase tracking-[0.14em] text-ink">Projects</h1>
            <p className="mt-6 text-lg text-deep/80 leading-relaxed">
              A selection of projects across Europe, shaped by youth participation and real-world outcomes.
            </p>
          </div>

          {/* Quick jump (desktop only) */}
          <div className="hidden lg:block w-60 shrink-0">
            <div className="sticky top-24 rounded-[10px] border border-muted/30 bg-paper p-5">
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-ink">Quick jump</div>
              <div className="mt-3 space-y-3">
                <a
                  className="block border-0 text-sm text-ink/80 hover:text-deep hover:underline hover:underline-offset-4"
                  href="#filters"
                >
                  Filters
                </a>
                <a
                  className="block border-0 text-sm text-ink/80 hover:text-deep hover:underline hover:underline-offset-4"
                  href="#list"
                >
                  Project list
                </a>
              </div>
            </div>
          </div>
        </div>

        <ProjectsClient projects={projects} />
      </div>
    </div>
  )
}
