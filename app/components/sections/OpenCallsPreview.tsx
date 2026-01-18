import Link from 'next/link'
import { getPayloadClient, asText } from '@/lib/payload'

interface OpenCall {
  id: string
  title: string | Record<string, string>
  slug: string
  status: 'open' | 'closed' | 'upcoming'
  deadline?: string
  location?: {
    city?: string
    country?: string
  }
  summary?: string | Record<string, string>
  eligibility?: string | Record<string, string>
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function getDaysUntil(dateString: string): number {
  const deadline = new Date(dateString)
  const now = new Date()
  const diffTime = deadline.getTime() - now.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export async function OpenCallsPreview() {
  let openCalls: OpenCall[] = []
  
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'open-calls',
      where: {
        status: { equals: 'open' },
      },
      limit: 3,
      sort: 'deadline',
    })
    openCalls = result.docs as unknown as OpenCall[]
  } catch (error) {
    console.error('Failed to fetch open calls:', error)
    return null // Database not ready yet
  }

  const getLocation = (call: OpenCall) => {
    if (!call.location) return ''
    const parts = [call.location.city, call.location.country].filter(Boolean)
    return parts.join(', ')
  }

  if (openCalls.length === 0) {
    return (
      <section className="py-20 md:py-28 bg-gradient-to-br from-blush/30 to-mist relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-coral rounded-full animate-pulse" />
        <div className="absolute bottom-40 right-32 w-3 h-3 bg-orange rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
        
        <div className="mx-auto max-w-[1280px] px-6 relative text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-coral mb-3">
            Opportunities
          </p>
          <h2 className="text-3xl md:text-5xl font-serif font-bold uppercase tracking-[0.1em] text-ink mb-6">
            Open Calls
          </h2>
          <p className="text-deep/70 text-lg mb-10 max-w-xl mx-auto">
            No open calls at the moment. Check back soon or subscribe to our newsletter for updates!
          </p>
          <Link
            href="/open-calls"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-coral to-orange text-paper uppercase text-sm font-bold tracking-[0.14em] hover:shadow-lg hover:shadow-coral/30 transition-all duration-300"
          >
            View Past Calls
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-blush/30 to-mist relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-coral/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-orange/10 rounded-full blur-3xl" />
      <div className="absolute top-20 right-40 w-4 h-4 bg-coral rounded-full animate-pulse" />
      <div className="absolute bottom-40 left-32 w-3 h-3 bg-orange rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
      
      <div className="mx-auto max-w-[1280px] px-6 relative">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-coral mb-3">
            Get Involved
          </p>
          <h2 className="text-3xl md:text-5xl font-serif font-bold uppercase tracking-[0.1em] text-ink mb-4">
            Open Calls
          </h2>
          <p className="text-deep/70 text-lg max-w-2xl mx-auto">
            Apply to participate in our transformative projects.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {openCalls.map((call) => {
            const daysLeft = call.deadline ? getDaysUntil(call.deadline) : null
            const isUrgent = daysLeft !== null && daysLeft <= 7 && daysLeft > 0
            
            return (
              <Link
                key={call.id}
                href={`/open-calls/${call.slug}`}
                className="group"
              >
                <div className="bg-paper rounded-3xl p-8 h-full flex flex-col border border-muted/20 hover:border-coral/30 hover:shadow-xl hover:shadow-coral/5 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
                  {/* Gradient accent */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-coral to-orange" />
                  
                  <div className="flex items-start justify-between mb-4">
                    <span className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.16em] bg-coral/20 text-coral">
                      Open
                    </span>
                    {isUrgent && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-orange/20 text-orange">
                        🔥 {daysLeft} days left
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-serif font-bold text-ink mb-3 group-hover:text-coral transition-colors">
                    {asText(call.title)}
                  </h3>
                  
                  {call.summary && (
                    <p className="text-sm text-deep/70 mb-6 flex-1 leading-relaxed line-clamp-3">
                      {asText(call.summary)}
                    </p>
                  )}
                  
                  <div className="space-y-3 pt-4 border-t border-muted/20">
                    {call.deadline && (
                      <p className="text-sm text-ink font-semibold flex items-center gap-2">
                        <span className="text-coral">📅</span>
                        Deadline: {formatDate(call.deadline)}
                      </p>
                    )}
                    {getLocation(call) && (
                      <p className="text-xs text-muted uppercase tracking-[0.12em] flex items-center gap-2">
                        <span>📍</span> {getLocation(call)}
                      </p>
                    )}
                  </div>
                  
                  <div className="mt-6 flex items-center gap-2 text-coral font-semibold text-sm group-hover:gap-3 transition-all">
                    <span>View details</span>
                    <span>→</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="text-center">
          <Link
            href="/open-calls"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-ink text-ink bg-transparent uppercase text-sm font-bold tracking-[0.14em] hover:bg-ink hover:text-paper transition-all duration-300 group"
          >
            <span>View All Calls</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
