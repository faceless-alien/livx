export function PartnerLogos() {
  const partners = ['Erasmus+', 'Youth Exchange Network', 'Local NGO Alliance', 'EU Mobility Hub', 'Community Lab', 'Impact Studio']

  return (
    <section className="py-16 md:py-24 bg-paper">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="flex items-end justify-between gap-6 mb-10">
          <h2 className="text-2xl md:text-3xl font-serif font-bold uppercase tracking-[0.14em] text-ink">
            Partners
          </h2>
          <div className="hidden md:block text-sm text-muted uppercase tracking-[0.16em]">
            Trusted collaborators
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 md:gap-6">
          {partners.map((name) => (
            <div
              key={name}
              className="rounded-[10px] border border-muted/30 bg-mist px-4 py-6 text-center text-[13px] uppercase tracking-[0.14em] text-deep/70 hover:text-deep hover:border-muted/50 transition-colors"
              aria-label={name}
              title={name}
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
