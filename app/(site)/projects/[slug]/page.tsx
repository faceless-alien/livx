import { getPayloadClient, asText } from '@/lib/payload'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { RichText } from '@/app/components/RichText'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

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
  content?: SerializedEditorState
  gallery?: { image: { url: string }; caption?: string }[]
  partners?: { name: string; url?: string }[]
  outcomes?: { outcome: string }[]
  featured?: boolean
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  const docs = result.docs as unknown as Project[]

  const project = docs[0]
  if (!project) return { title: 'Project Not Found' }

  return {
    title: `${asText(project.title)} | LIVX Projects`,
    description: project.summary ? asText(project.summary) : undefined,
  }
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })
  const docs = result.docs as unknown as Project[]

  const project = docs[0]
  if (!project) notFound()

  const getLocation = () => {
    if (!project.location) return ''
    const parts = [project.location.city, project.location.country].filter(Boolean)
    return parts.join(', ')
  }

  const formatDate = (date?: string) => {
    if (!date) return null
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const getThemes = () => {
    return project.themes?.map(t => t.theme).filter(Boolean) || []
  }

  const getOutcomes = () => {
    return project.outcomes?.map(o => o.outcome).filter(Boolean) || []
  }

  return (
    <div className="bg-mist">
      <div className="mx-auto max-w-[1280px] px-6 py-16 md:py-24">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link href="/projects" className="text-sm text-muted hover:text-ink transition-colors">
            ← Back to Projects
          </Link>
        </nav>

        {/* Header */}
        <header className="max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex rounded-full bg-ink px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-paper">
              {project.status}
            </span>
            {getLocation() && (
              <span className="text-sm text-muted">{getLocation()}</span>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-serif font-bold uppercase tracking-[0.14em] text-ink">
            {asText(project.title)}
          </h1>

          {project.summary && (
            <p className="mt-6 text-xl text-deep/80 leading-relaxed">
              {asText(project.summary)}
            </p>
          )}

          {/* Project Info */}
          <div className="mt-8 flex flex-wrap gap-6 text-sm">
            {project.type && (
              <div>
                <span className="text-muted uppercase tracking-[0.12em]">Type:</span>{' '}
                <span className="text-ink font-medium">{project.type}</span>
              </div>
            )}
            {project.startDate && (
              <div>
                <span className="text-muted uppercase tracking-[0.12em]">Start:</span>{' '}
                <span className="text-ink font-medium">{formatDate(project.startDate)}</span>
              </div>
            )}
            {project.endDate && (
              <div>
                <span className="text-muted uppercase tracking-[0.12em]">End:</span>{' '}
                <span className="text-ink font-medium">{formatDate(project.endDate)}</span>
              </div>
            )}
          </div>

          {/* Themes */}
          {getThemes().length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {getThemes().map((theme) => (
                <span
                  key={theme}
                  className="inline-flex rounded-full border border-muted/30 bg-paper px-4 py-2 text-[13px] uppercase tracking-[0.12em] text-deep"
                >
                  {theme}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Content */}
        {project.content && (
          <article className="mt-12 max-w-3xl">
            <div className="prose prose-lg prose-slate max-w-none">
              <RichText data={project.content} className="rich-text-content" />
            </div>
          </article>
        )}

        {/* Outcomes */}
        {getOutcomes().length > 0 && (
          <section className="mt-12 max-w-3xl">
            <h2 className="text-2xl font-serif font-bold uppercase tracking-[0.14em] text-ink mb-6">
              Outcomes
            </h2>
            <ul className="space-y-3">
              {getOutcomes().map((outcome, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-blush mt-1">✓</span>
                  <span className="text-deep/80">{outcome}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Partners */}
        {project.partners && project.partners.length > 0 && (
          <section className="mt-12 max-w-3xl">
            <h2 className="text-2xl font-serif font-bold uppercase tracking-[0.14em] text-ink mb-6">
              Partners
            </h2>
            <div className="flex flex-wrap gap-4">
              {project.partners.map((partner, idx) => (
                <div key={idx} className="rounded-[10px] border border-muted/30 bg-paper px-4 py-3">
                  {partner.url ? (
                    <a
                      href={partner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ink hover:text-blush transition-colors"
                    >
                      {partner.name} ↗
                    </a>
                  ) : (
                    <span className="text-ink">{partner.name}</span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-serif font-bold uppercase tracking-[0.14em] text-ink mb-6">
              Gallery
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.gallery.map((item, idx) => (
                <figure key={idx} className="rounded-[10px] overflow-hidden bg-paper">
                  {item.image?.url && (
                    <img
                      src={item.image.url}
                      alt={item.caption || `Gallery image ${idx + 1}`}
                      className="w-full h-64 object-cover"
                    />
                  )}
                  {item.caption && (
                    <figcaption className="p-4 text-sm text-muted">
                      {item.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
