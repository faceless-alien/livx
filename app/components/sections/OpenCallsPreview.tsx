import Link from 'next/link'

import { asText, getPayloadClient } from '@/lib/payload'

function formatCallStatus(status: unknown) {
  if (status === 'open') return 'OPEN'
  if (status === 'closed') return 'CLOSED'
  if (status === 'draft') return 'DRAFT'
  return 'OPEN'
}

export async function OpenCallsPreview() {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'open-calls',
    limit: 3,
    sort: 'deadline',
    where: {
      status: {
        equals: 'open',
      },
    },
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
      snippet: '',
    }
  })

  return (
    <section className="py-16 md:py-24 bg-mist">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold uppercase tracking-[0.14em] text-ink mb-4">
            Latest Open Calls
          </h2>
          <p className="text-deep/80 text-lg">
            Explore our current opportunities and apply to join our programs.
          </p>
        </div>

        <div className="space-y-6 mb-12">
          {calls.map((call) => (
            <Link
              key={call.id}
              href={`/open-calls/${call.slug}`}
              className="block group border-0"
            >
              <div className="bg-paper p-8 rounded-[10px] border border-muted/30 hover:border-blush transition-colors hover:-translate-y-[1px] hover:shadow-sm">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="inline-flex rounded-full bg-orange px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-paper">
                        {call.status}
                      </span>
                      <span className="text-[13px] text-muted uppercase tracking-[0.12em]">
                        {call.location}
                      </span>
                    </div>

                    <h3 className="text-xl font-serif font-bold text-ink group-hover:underline group-hover:decoration-muted/50 group-hover:underline-offset-4 transition-colors">
                    {call.title}
                  </h3>
                  </div>

                  <div className="text-sm font-medium text-deep/80">
                    <span className="text-xs uppercase tracking-[0.16em] text-muted">Deadline</span>
                    <div className="mt-1">
                      {call.deadline
                        ? new Date(call.deadline).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })
                        : '—'}
                    </div>
                  </div>
                </div>
                <p className="text-deep/80 leading-relaxed">{call.snippet}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/open-calls"
            className="inline-flex px-8 py-3 rounded-[10px] border border-ink text-ink bg-transparent uppercase text-sm font-medium tracking-[0.14em] hover:bg-ink hover:text-paper transition-colors"
          >
            View All Open Calls
          </Link>
        </div>
      </div>
    </section>
  )
}
