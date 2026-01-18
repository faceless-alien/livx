import Link from 'next/link'
import { getPayloadClient, asText } from '@/lib/payload'

interface Project {
  id: string
  title: string | Record<string, string>
  slug: string
  status: 'upcoming' | 'ongoing' | 'completed'
  location?: {
    city?: string
    country?: string
  }
  summary?: string | Record<string, string>
  featured?: boolean
}

const statusConfig = {
  upcoming: { icon: '🚀', color: 'from-orange/20 to-coral/10', badge: 'bg-orange/20 text-orange' },
  ongoing: { icon: '⚡', color: 'from-coral/20 to-blush/20', badge: 'bg-coral/20 text-coral' },
  completed: { icon: '✨', color: 'from-blush/30 to-mist', badge: 'bg-blush/40 text-deep' },
}

export async function FeaturedProjects() {
  let displayProjects: Project[] = []
  
  try {
    const payload = await getPayloadClient()
    const featuredResult = await payload.find({
      collection: 'projects',
      where: {
        featured: { equals: true },
      },
      limit: 3,
      sort: '-createdAt',
    })
    const projects = featuredResult.docs as unknown as Project[]

    displayProjects = projects
    if (projects.length === 0) {
      const latestResult = await payload.find({
        collection: 'projects',
        limit: 3,
        sort: '-createdAt',
      })
      displayProjects = latestResult.docs as unknown as Project[]
    }
  } catch (error) {
    console.error('Failed to fetch projects:', error)
    return null // Database not ready yet
  }

  const getLocation = (project: Project) => {
    if (!project.location) return ''
    const parts = [project.location.city, project.location.country].filter(Boolean)
    return parts.join(', ')
  }

  if (displayProjects.length === 0) {
    return null
  }

  return (
    <section className="py-20 md:py-28 bg-paper relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blush/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      <div className="mx-auto max-w-[1280px] px-6 relative">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-coral mb-3">
            Making an Impact
          </p>
          <h2 className="text-3xl md:text-5xl font-serif font-bold uppercase tracking-[0.1em] text-ink mb-4">
            Featured Projects
          </h2>
          <p className="text-deep/70 text-lg max-w-2xl mx-auto">
            Discover the impactful work we&apos;re doing across Europe.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {displayProjects.map((project) => {
            const config = statusConfig[project.status] || statusConfig.upcoming
            return (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="group"
              >
                <div className={`bg-gradient-to-br ${config.color} rounded-3xl overflow-hidden border border-muted/20 hover:border-coral/30 hover:shadow-xl hover:shadow-coral/5 transition-all duration-300 h-full flex flex-col hover:-translate-y-2`}>
                  <div className="h-48 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300">
                    {config.icon}
                  </div>
                  <div className="p-6 flex-1 flex flex-col bg-paper/80 backdrop-blur-sm">
                    <div className="mb-3">
                      <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.16em] ${config.badge}`}>
                        {project.status}
                      </span>
                    </div>
                    <h3 className="text-lg font-serif font-bold text-ink mb-2 group-hover:text-coral transition-colors">
                      {asText(project.title)}
                    </h3>
                    {project.summary && (
                      <p className="text-sm text-deep/70 mb-4 flex-1 leading-relaxed line-clamp-3">
                        {asText(project.summary)}
                      </p>
                    )}
                    {getLocation(project) && (
                      <p className="text-xs text-muted uppercase tracking-[0.12em] flex items-center gap-1">
                        <span>📍</span> {getLocation(project)}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-ink text-ink bg-transparent uppercase text-sm font-bold tracking-[0.14em] hover:bg-ink hover:text-paper transition-all duration-300 group"
          >
            <span>View All Projects</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
