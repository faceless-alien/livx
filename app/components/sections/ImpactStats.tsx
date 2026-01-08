export function ImpactStats() {
  const stats = [
    { label: '500+', description: 'Young people empowered' },
    { label: '15+', description: 'Countries reached' },
    { label: '50+', description: 'Partner organizations' },
  ]

  return (
    <section className="py-16 md:py-24 bg-mist">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="rounded-[10px] border border-muted/30 bg-paper p-10 text-center hover:border-blush transition-colors"
            >
              <p className="text-5xl md:text-6xl font-serif font-bold text-ink mb-3 tracking-tight">{stat.label}</p>
              <p className="text-deep/80 text-lg">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
