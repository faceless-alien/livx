import { getPayloadClient, asText } from '@/lib/payload'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

interface Project {
  id: string
  title: string | Record<string, string>
  slug: string
  status: 'upcoming' | 'ongoing' | 'completed'
  type: string
  location?: {
    city?: string
    country?: string
  }
  startDate?: string
  endDate?: string
  themes?: { theme: string }[]
  summary?: string | Record<string, string>
  featured?: boolean
}

export default async function Projects() {
  let projects: Project[] = []

  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'projects',
      limit: 100,
      sort: '-createdAt',
    })
    projects = result.docs as unknown as Project[]
  } catch (error) {
    console.error('Failed to fetch projects:', error)
    // Return setup message if database not ready
    return (
      <div className="bg-mist min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-serif font-bold text-ink mb-4">Setting Up...</h1>
          <p className="text-deep/70">Please visit <Link href="/admin" className="text-coral underline">/admin</Link> to initialize the database.</p>
        </div>
      </div>
    )
  }

  const getYear = (project: Project) => {
    if (project.startDate) {
      return new Date(project.startDate).getFullYear()
    }
    return null
  }

  const getLocation = (project: Project) => {
    if (!project.location) return ''
    const parts = [project.location.city, project.location.country].filter(Boolean)
    return parts.join(', ')
  }

  const getThemes = (project: Project) => {
    return project.themes?.map(t => t.theme).filter(Boolean) || []
  }

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
                  href="#list"
                >
                  Project list
                </a>
              </div>
            </div>
          </div>
        </div>

        {projects.length === 0 ? (
          <div className="mt-12 text-center py-16">
            <p className="text-lg text-muted">No projects found. Check back soon!</p>
          </div>
        ) : (
          <div className="mt-10 space-y-6" id="list">
            {projects.map((project) => (
              <Link key={project.id} href={`/projects/${project.slug}`} className="group border-0 block">
                <div className="bg-paper p-8 rounded-[10px] border border-muted/30 hover:border-blush transition-colors hover:-translate-y-[1px] hover:shadow-sm">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">{project.status}</span>
                        {getLocation(project) && (
                          <>
                            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">•</span>
                            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">{getLocation(project)}</span>
                          </>
                        )}
                      </div>

                      <h2 className="mt-3 text-2xl font-serif font-bold text-ink group-hover:underline group-hover:decoration-muted/50 group-hover:underline-offset-4">
                        {asText(project.title)}
                      </h2>

                      {project.summary && (
                        <p className="mt-3 text-deep/80 leading-relaxed">{asText(project.summary)}</p>
                      )}

                      {getThemes(project).length > 0 && (
                        <div className="mt-5 flex flex-wrap gap-2">
                          {getThemes(project).map((theme) => (
                            <span
                              key={theme}
                              className="inline-flex rounded-full border border-muted/30 bg-mist px-4 py-2 text-[13px] uppercase tracking-[0.12em] text-deep"
                            >
                              {theme}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {getYear(project) && (
                      <div className="min-w-[140px] text-right">
                        <div className="text-xs uppercase tracking-[0.16em] text-muted">Year</div>
                        <div className="mt-2 text-lg font-semibold text-ink">{getYear(project)}</div>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
