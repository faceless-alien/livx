export function Testimonials() {
  const testimonials = [
    {
      quote:
        'I came for the exchange and left with confidence, friends across Europe, and a clearer path forward.',
      name: 'Marta',
      meta: 'Portugal · Youth Exchange Participant',
    },
    {
      quote:
        'The facilitation was warm, professional, and genuinely empowering. It felt like a premium learning experience.',
      name: 'Kacper',
      meta: 'Poland · Training Participant',
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-mist">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold uppercase tracking-[0.14em] text-ink mb-4">
            Stories
          </h2>
          <p className="text-deep/80 text-lg max-w-2xl mx-auto">
            Short moments from people who joined the journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="rounded-[10px] border border-muted/30 border-t-2 border-t-blush bg-paper p-8"
            >
              <blockquote className="text-xl md:text-2xl font-serif text-ink leading-snug">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6">
                <div className="text-sm font-semibold uppercase tracking-[0.16em] text-ink">
                  {t.name}
                </div>
                <div className="mt-1 text-sm text-muted">{t.meta}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
