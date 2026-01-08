import Link from 'next/link'

import { asText, getPayloadClient } from '@/lib/payload'

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

export async function FeaturedProjects() {
  const payload = await getPayloadClient()

  const featured = await payload.find({
    collection: 'projects',
    limit: 3,
    sort: '-createdAt',
    where: {
      featured: {
        equals: true,
      },
    },
  })

  const fallback = featured.docs.length
    ? featured
    : await payload.find({
        collection: 'projects',
        limit: 3,
        sort: '-createdAt',
      })

  const projects = fallback.docs.map((doc: unknown) => {
    const record = doc as Record<string, unknown>
    const idValue = record.id
    const id = String(idValue)

    const rawSlug = record.slug
    const slug =
      typeof rawSlug === 'string' && rawSlug.trim().length > 0 ? rawSlug.trim() : id

    return {
      id,
      slug,
      title: asText(record.title) || 'Untitled project',
      status: formatProjectStatus(record.status),
      location: formatProjectLocation(record.location),
      summary: asText(record.summary),
    }
  })

  return (
    <section className="py-16 md:py-24 px-4 bg-paper">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold uppercase tracking-[0.14em] text-ink mb-4">
            Featured Projects
          </h2>
          <p className="text-deep/80 text-lg">
            Discover the impactful work we’re doing across Europe.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="group border-0"
            >
              <div className="bg-paper rounded-[10px] overflow-hidden border border-muted/30 hover:border-blush transition-colors h-full flex flex-col hover:-translate-y-[1px] hover:shadow-sm">
                <div className="h-48 bg-mist" />
                <div className="p-6 flex-1 flex flex-col">
                  <div className="mb-3">
                    <span className="text-xs font-medium text-muted uppercase tracking-[0.16em]">
                      {project.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-serif font-bold text-ink mb-2 group-hover:underline group-hover:decoration-muted/50 group-hover:underline-offset-4 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-deep/80 mb-4 flex-1 leading-relaxed">
                    {project.summary || '—'}
                  </p>
                  <p className="text-xs text-muted uppercase tracking-[0.12em]">{project.location}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/projects"
            className="inline-flex px-8 py-3 rounded-[10px] border border-ink text-ink bg-transparent uppercase text-sm font-medium tracking-[0.14em] hover:bg-ink hover:text-paper transition-colors"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  )
}
