export function WhatWeDo() {
  const activities = [
    {
      title: 'International Exchanges',
      description: 'Facilitate meaningful cultural exchanges that foster personal growth and international understanding among young people.',
    },
    {
      title: 'Volunteering Programs',
      description: 'Provide opportunities for youth to contribute to communities while developing skills and building global networks.',
    },
    {
      title: 'Non-formal Education',
      description: 'Design innovative workshops and training programs that complement formal education and develop key life skills.',
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-mist">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-serif font-bold uppercase tracking-[0.14em] text-ink mb-5">
            What We Do
          </h2>
          <p className="text-deep/80 text-lg max-w-2xl mx-auto leading-relaxed">
            Our programs are built on the principles of inclusion, quality, and impact, empowering young people to become active global citizens.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="bg-paper p-8 rounded-[10px] border border-muted/30 border-t-2 border-t-blush hover:border-blush transition-colors hover:-translate-y-[1px] hover:shadow-sm"
            >
              <h3 className="text-xl font-serif font-bold tracking-[0.12em] text-ink mb-4">
                {activity.title}
              </h3>
              <p className="text-deep/80 leading-relaxed">
                {activity.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
