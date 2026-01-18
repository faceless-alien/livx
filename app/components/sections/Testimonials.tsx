import { getPayloadClient, asText } from '@/lib/payload'

interface Story {
  id: string
  name: string | Record<string, string>
  slug: string
  meta?: string | Record<string, string>
  quote?: string | Record<string, string>
  featured?: boolean
  order?: number
}

export async function Testimonials() {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'stories',
    where: {
      featured: { equals: true },
    },
    limit: 4,
    sort: 'order',
  })
  let stories = result.docs as unknown as Story[]

  // Fallback to latest if no featured
  if (stories.length === 0) {
    const fallbackResult = await payload.find({
      collection: 'stories',
      limit: 4,
      sort: '-createdAt',
    })
    stories = fallbackResult.docs as unknown as Story[]
  }

  if (stories.length === 0) {
    return null
  }

  const colors = [
    'from-coral/20 to-orange/10',
    'from-blush/40 to-coral/10',
    'from-orange/20 to-coral/10',
    'from-coral/30 to-blush/20',
  ]

  return (
    <section className="py-20 md:py-28 bg-mist relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-blush/30 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute top-1/4 right-0 w-48 h-48 bg-coral/20 rounded-full blur-3xl translate-x-1/2" />
      
      <div className="mx-auto max-w-[1280px] px-6 relative">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-coral mb-3">
            Real Experiences
          </p>
          <h2 className="text-3xl md:text-5xl font-serif font-bold uppercase tracking-[0.1em] text-ink mb-4">
            Stories That Inspire
          </h2>
          <p className="text-deep/70 text-lg max-w-2xl mx-auto">
            Short moments from people who joined the journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {stories.map((story, idx) => (
            <figure
              key={story.id}
              className={`group bg-gradient-to-br ${colors[idx % colors.length]} rounded-3xl p-8 md:p-10 border border-muted/20 hover:shadow-xl hover:shadow-coral/5 transition-all duration-300 hover:-translate-y-1`}
            >
              <div className="text-5xl mb-6 opacity-30">&ldquo;</div>
              <blockquote className="text-xl md:text-2xl font-serif text-ink leading-relaxed -mt-8">
                {asText(story.quote)}
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-coral to-orange flex items-center justify-center text-paper font-bold text-lg">
                  {asText(story.name).charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-ink">
                    {asText(story.name)}
                  </div>
                  {story.meta && (
                    <div className="text-sm text-muted">{asText(story.meta)}</div>
                  )}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
