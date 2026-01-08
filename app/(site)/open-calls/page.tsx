import Link from 'next/link'

import { asText, getPayloadClient } from '@/lib/payload'

export const revalidate = 60

function formatCallStatus(status: unknown) {
  if (status === 'open') return 'OPEN'
  if (status === 'closed') return 'CLOSED'
  if (status === 'draft') return 'DRAFT'
  return 'OPEN'
}

function formatAgeRange(range: unknown) {
  if (!range || typeof range !== 'object') return ''
  const record = range as Record<string, unknown>
  const min = typeof record.min === 'number' ? record.min : undefined
  const max = typeof record.max === 'number' ? record.max : undefined
  if (min == null && max == null) return ''
  if (min != null && max != null) return `${min}-${max}`
  if (min != null) return `${min}+`
  return `≤${max}`
}

export default async function OpenCalls() {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'open-calls',
    limit: 50,
    sort: 'deadline',
  })

  const calls = result.docs.map((doc: unknown) => {
    const record = doc as Record<string, unknown>
    const idValue = record.id
    const id = String(idValue)

    const rawSlug = record.slug
    const slug =
      typeof rawSlug === 'string' && rawSlug.trim().length > 0 ? rawSlug.trim() : id

    const rawLocation = record.location
    const rawDeadline = record.deadline
    const deadline =
      rawDeadline instanceof Date || typeof rawDeadline === 'string' || typeof rawDeadline === 'number'
        ? rawDeadline
        : undefined

    return {
      id,
      slug,
      title: asText(record.title) || 'Untitled call',
      deadline,
      location: typeof rawLocation === 'string' ? rawLocation : '',
      status: formatCallStatus(record.status),
      ageRange: formatAgeRange(record.ageRange),
      summary: '',
    }
  })

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

        <div className="mt-12" id="list">
          <div className="space-y-6">
            {calls.map((call) => (
              <Link key={call.id} href={`/open-calls/${call.slug}`} className="group border-0 block">
                <div className="bg-paper p-8 rounded-[10px] border border-muted/30 hover:border-blush transition-colors hover:-translate-y-[1px] hover:shadow-sm">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex rounded-full bg-orange px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-paper">
                          {call.status}
                        </span>
                        <span className="text-[13px] text-muted uppercase tracking-[0.12em]">{call.location}</span>
                      </div>

                      <h2 className="mt-3 text-2xl font-serif font-bold text-ink group-hover:underline group-hover:decoration-muted/50 group-hover:underline-offset-4">
                        {call.title}
                      </h2>

                      <p className="mt-3 text-deep/80 leading-relaxed">{call.summary || '—'}</p>

                      <div className="mt-5 flex flex-wrap gap-3">
                        <span className="inline-flex rounded-full border border-muted/30 bg-mist px-4 py-2 text-[13px] uppercase tracking-[0.12em] text-deep">
                          Age {call.ageRange || '—'}
                        </span>
                      </div>
                    </div>

                    <div className="min-w-[220px]">
                      <div className="text-xs uppercase tracking-[0.16em] text-muted">Deadline</div>
                      <div className="mt-2 text-lg font-semibold text-ink">
                        {call.deadline
                          ? new Date(call.deadline).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })
                          : '—'}
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

        <div className="mt-14" id="apply">
          <div className="rounded-[10px] border border-muted/30 bg-blush p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-serif font-bold uppercase tracking-[0.14em] text-ink">
              Ready to join?
            </h2>
            <p className="mt-4 text-deep/80 leading-relaxed">
              Apply via an open call, or reach out if you’re not sure which program fits best.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-4">
              <a
                href="#list"
                className="inline-flex items-center justify-center rounded-[10px] bg-ink px-8 py-4 text-paper uppercase text-sm font-medium tracking-[0.14em] hover:opacity-90 transition-opacity border-0"
              >
                Browse calls
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-[10px] border border-ink bg-transparent px-8 py-4 text-ink uppercase text-sm font-medium tracking-[0.14em] hover:bg-ink hover:text-paper transition-colors border-0"
              >
                Ask a question
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
