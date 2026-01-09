import { getPayloadClient, asText } from '@/lib/payload'
import Link from 'next/link'

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
  applyUrl?: string
}

export default async function OpenCalls() {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'open-calls',
    limit: 100,
    sort: 'deadline',
    where: {
      status: { not_equals: 'draft' },
    },
  })
  const calls = result.docs as unknown as OpenCall[]

  const formatDeadline = (deadline: string) => {
    return new Date(deadline).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const getAgeRange = (call: OpenCall) => {
    if (!call.ageRange) return null
    const { min, max } = call.ageRange
    if (min && max) return `${min}-${max}`
    if (min) return `${min}+`
    if (max) return `Up to ${max}`
    return null
  }

  return (
    <div className="bg-mist">
      <div className="mx-auto max-w-[1280px] px-6 py-16 md:py-24">
        <div className="flex items-start justify-between gap-10">
          <div className="max-w-3xl" id="top">
            <h1 className="text-4xl md:text-5xl font-serif font-bold uppercase tracking-[0.14em] text-ink">Open Calls</h1>

            <p className="mt-6 text-lg text-deep/80 leading-relaxed">
              Explore current opportunities and apply to participate in transformative programs.
              <span className="text-muted"> </span>
              All LIVX programs are open to young people from across Europe and beyond.
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
                  Calls
                </a>
                <a
                  className="block border-0 text-sm text-ink/80 hover:text-deep hover:underline hover:underline-offset-4"
                  href="#apply"
                >
                  Apply
                </a>
              </div>
            </div>
          </div>
        </div>

        {calls.length === 0 ? (
          <div className="mt-12 text-center py-16">
            <p className="text-lg text-muted">No open calls at the moment. Check back soon!</p>
          </div>
        ) : (
          <div className="mt-12" id="list">
            <div className="space-y-6">
              {calls.map((call) => (
                <Link key={call.id} href={`/open-calls/${call.slug}`} className="group border-0 block">
                  <div className="bg-paper p-8 rounded-[10px] border border-muted/30 hover:border-blush transition-colors hover:-translate-y-[1px] hover:shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${
                            call.status === 'open' 
                              ? 'bg-orange text-paper' 
                              : 'bg-muted/20 text-muted'
                          }`}>
                            {call.status}
                          </span>
                          {call.location && (
                            <span className="text-[13px] text-muted uppercase tracking-[0.12em]">{call.location}</span>
                          )}
                        </div>

                        <h2 className="mt-3 text-2xl font-serif font-bold text-ink group-hover:underline group-hover:decoration-muted/50 group-hover:underline-offset-4">
                          {asText(call.title)}
                        </h2>

                        <div className="mt-5 flex flex-wrap gap-3">
                          {getAgeRange(call) && (
                            <span className="inline-flex rounded-full border border-muted/30 bg-mist px-4 py-2 text-[13px] uppercase tracking-[0.12em] text-deep">
                              Age {getAgeRange(call)}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="min-w-[220px]">
                        <div className="text-xs uppercase tracking-[0.16em] text-muted">Deadline</div>
                        <div className="mt-2 text-lg font-semibold text-ink">
                          {formatDeadline(call.deadline)}
                        </div>
                        <div className="mt-4 text-sm text-deep/80">
                          <span className="underline decoration-muted/50 underline-offset-4">View details</span> →
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-14" id="apply">
          <div className="rounded-[10px] border border-muted/30 bg-blush p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-serif font-bold uppercase tracking-[0.14em] text-ink">
              Ready to join?
            </h2>
            <p className="mt-4 text-deep/80 leading-relaxed">
              Apply via an open call, or reach out if you&apos;re not sure which program fits best.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-4">
              <a
                href="#list"
                className="inline-flex items-center justify-center rounded-[10px] bg-ink px-8 py-4 text-paper uppercase text-sm font-medium tracking-[0.14em] hover:opacity-90 transition-opacity border-0"
              >
                Browse calls
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-[10px] border border-ink bg-transparent px-8 py-4 text-ink uppercase text-sm font-medium tracking-[0.14em] hover:bg-ink hover:text-paper transition-colors"
              >
                Ask a question
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
