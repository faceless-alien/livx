import { getPayloadClient } from '@/lib/payload'
import Image from 'next/image'

interface Partner {
  id: string
  name: string
  slug: string
  website?: string
  logo?: {
    url: string
    alt?: string
  }
  featured?: boolean
  order?: number
}

export async function PartnerLogos() {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'partners',
    limit: 12,
    sort: 'order',
    depth: 1,
  })
  const partners = result.docs as unknown as Partner[]

  if (partners.length === 0) {
    return null
  }

  return (
    <section className="py-20 md:py-28 bg-paper relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-mist/50 to-transparent pointer-events-none" />
      
      <div className="mx-auto max-w-[1280px] px-6 relative">
        <div className="flex items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-coral mb-3">
              Working Together
            </p>
            <h2 className="text-2xl md:text-3xl font-serif font-bold uppercase tracking-[0.14em] text-ink">
              Our Partners
            </h2>
          </div>
          <div className="hidden md:block text-sm text-muted uppercase tracking-[0.16em]">
            Trusted collaborators
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {partners.map((partner) => (
            <a
              key={partner.id}
              href={partner.website || '#'}
              target={partner.website ? '_blank' : undefined}
              rel={partner.website ? 'noopener noreferrer' : undefined}
              className="group rounded-2xl border border-muted/20 bg-gradient-to-br from-mist to-paper px-4 py-8 flex flex-col items-center justify-center gap-3 hover:border-coral/40 hover:shadow-lg hover:shadow-coral/5 transition-all duration-300 hover:-translate-y-1"
            >
              {partner.logo?.url ? (
                <div className="h-12 w-full relative flex items-center justify-center">
                  <Image
                    src={partner.logo.url}
                    alt={partner.logo.alt || partner.name}
                    width={120}
                    height={48}
                    className="object-contain max-h-12 opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              ) : (
                <div className="h-12 flex items-center justify-center">
                  <span className="text-2xl">🤝</span>
                </div>
              )}
              <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-deep/60 group-hover:text-deep text-center transition-colors">
                {partner.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
