import { getPayloadClient, asText } from '@/lib/payload'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { RichText } from '@/app/components/RichText'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

export const dynamic = 'force-dynamic'

interface OpenCall {
  id: string
  title: string | Record<string, string>
  slug: string
  status: 'open' | 'closed' | 'draft'
  deadline: string
  startDate?: string
  endDate?: string
  location?: string
  eligibleCountries?: { country: string }[]
  ageRange?: {
    min?: number
    max?: number
  }
  costsCovered?: { cost: string }[]
  howToApply?: SerializedEditorState
  selectionTimeline?: { phase: string; date: string }[]
  applyUrl?: string
  attachments?: { document: { url: string }; title?: string }[]
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'open-calls',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  const docs = result.docs as unknown as OpenCall[]

  const call = docs[0]
  if (!call) return { title: 'Open Call Not Found' }

  return {
    title: `${asText(call.title)} | LIVX Open Calls`,
  }
}

export default async function OpenCallPage({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'open-calls',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })
  const docs = result.docs as unknown as OpenCall[]

  const call = docs[0]
  if (!call) notFound()

  const formatDate = (date?: string) => {
    if (!date) return null
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const getAgeRange = () => {
    if (!call.ageRange) return null
    const { min, max } = call.ageRange
    if (min && max) return `${min}-${max} years old`
    if (min) return `${min}+ years old`
    if (max) return `Up to ${max} years old`
    return null
  }

  const getEligibleCountries = () => {
    return call.eligibleCountries?.map(c => c.country).filter(Boolean) || []
  }

  const getCostsCovered = () => {
    return call.costsCovered?.map(c => c.cost).filter(Boolean) || []
  }

  const isOpen = call.status === 'open'

  return (
    <div className="bg-mist">
      <div className="mx-auto max-w-[1280px] px-6 py-16 md:py-24">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link href="/open-calls" className="text-sm text-muted hover:text-ink transition-colors">
            ← Back to Open Calls
          </Link>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <header>
              <div className="flex items-center gap-3 mb-4">
                <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${
                  isOpen ? 'bg-orange text-paper' : 'bg-muted/30 text-muted'
                }`}>
                  {call.status}
                </span>
                {call.location && (
                  <span className="text-sm text-muted">{call.location}</span>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl font-serif font-bold uppercase tracking-[0.14em] text-ink">
                {asText(call.title)}
              </h1>
            </header>

            {/* How to Apply */}
            {call.howToApply && (
              <section className="mt-10">
                <h2 className="text-2xl font-serif font-bold uppercase tracking-[0.14em] text-ink mb-6">
                  How to Apply
                </h2>
                <div className="prose prose-lg prose-slate max-w-none bg-paper rounded-[10px] p-6 border border-muted/30">
                  <RichText data={call.howToApply} className="rich-text-content" />
                </div>
              </section>
            )}

            {/* Selection Timeline */}
            {call.selectionTimeline && call.selectionTimeline.length > 0 && (
              <section className="mt-10">
                <h2 className="text-2xl font-serif font-bold uppercase tracking-[0.14em] text-ink mb-6">
                  Selection Timeline
                </h2>
                <div className="space-y-4">
                  {call.selectionTimeline.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4 bg-paper rounded-[10px] p-4 border border-muted/30">
                      <div className="w-3 h-3 rounded-full bg-blush mt-1.5 shrink-0" />
                      <div>
                        <div className="font-medium text-ink">{item.phase}</div>
                        {item.date && (
                          <div className="text-sm text-muted mt-1">{formatDate(item.date)}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Attachments */}
            {call.attachments && call.attachments.length > 0 && (
              <section className="mt-10">
                <h2 className="text-2xl font-serif font-bold uppercase tracking-[0.14em] text-ink mb-6">
                  Documents
                </h2>
                <div className="space-y-3">
                  {call.attachments.map((attachment, idx) => (
                    <a
                      key={idx}
                      href={attachment.document?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 bg-paper rounded-[10px] p-4 border border-muted/30 hover:border-blush transition-colors"
                    >
                      <span className="text-2xl">📄</span>
                      <span className="text-ink font-medium">
                        {attachment.title || `Document ${idx + 1}`}
                      </span>
                      <span className="ml-auto text-muted">↓</span>
                    </a>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Key Info Card */}
              <div className="rounded-[10px] border border-muted/30 bg-paper p-6">
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-ink mb-4">
                  Key Information
                </h3>

                <dl className="space-y-4">
                  <div>
                    <dt className="text-xs uppercase tracking-[0.12em] text-muted">Deadline</dt>
                    <dd className="mt-1 text-lg font-semibold text-ink">{formatDate(call.deadline)}</dd>
                  </div>

                  {call.startDate && (
                    <div>
                      <dt className="text-xs uppercase tracking-[0.12em] text-muted">Start Date</dt>
                      <dd className="mt-1 text-ink">{formatDate(call.startDate)}</dd>
                    </div>
                  )}

                  {call.endDate && (
                    <div>
                      <dt className="text-xs uppercase tracking-[0.12em] text-muted">End Date</dt>
                      <dd className="mt-1 text-ink">{formatDate(call.endDate)}</dd>
                    </div>
                  )}

                  {getAgeRange() && (
                    <div>
                      <dt className="text-xs uppercase tracking-[0.12em] text-muted">Age Range</dt>
                      <dd className="mt-1 text-ink">{getAgeRange()}</dd>
                    </div>
                  )}

                  {call.location && (
                    <div>
                      <dt className="text-xs uppercase tracking-[0.12em] text-muted">Location</dt>
                      <dd className="mt-1 text-ink">{call.location}</dd>
                    </div>
                  )}
                </dl>

                {/* Apply Button */}
                {isOpen && call.applyUrl && (
                  <a
                    href={call.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 w-full inline-flex items-center justify-center rounded-[10px] bg-ink px-8 py-4 text-paper uppercase text-sm font-medium tracking-[0.14em] hover:opacity-90 transition-opacity"
                  >
                    Apply Now →
                  </a>
                )}

                {!isOpen && (
                  <div className="mt-6 text-center py-3 rounded-[10px] bg-muted/10 text-muted text-sm">
                    Applications closed
                  </div>
                )}
              </div>

              {/* Eligible Countries */}
              {getEligibleCountries().length > 0 && (
                <div className="rounded-[10px] border border-muted/30 bg-paper p-6">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-ink mb-4">
                    Eligible Countries
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {getEligibleCountries().map((country) => (
                      <span
                        key={country}
                        className="inline-flex rounded-full border border-muted/30 bg-mist px-3 py-1 text-xs text-deep"
                      >
                        {country}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Costs Covered */}
              {getCostsCovered().length > 0 && (
                <div className="rounded-[10px] border border-muted/30 bg-paper p-6">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-ink mb-4">
                    Costs Covered
                  </h3>
                  <ul className="space-y-2">
                    {getCostsCovered().map((cost, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-deep">
                        <span className="text-blush mt-0.5">✓</span>
                        {cost}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
