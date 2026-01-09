export function WhatWeDo() {
  const activities = [
    {
      icon: '🌍',
      title: 'International Exchanges',
      description: 'Facilitate meaningful cultural exchanges that foster personal growth and international understanding among young people.',
      color: 'from-coral/20 to-orange/10',
      borderColor: 'border-coral/30',
    },
    {
      icon: '🤝',
      title: 'Volunteering Programs',
      description: 'Provide opportunities for youth to contribute to communities while developing skills and building global networks.',
      color: 'from-blush/40 to-coral/10',
      borderColor: 'border-blush/50',
    },
    {
      icon: '💡',
      title: 'Non-formal Education',
      description: 'Design innovative workshops and training programs that complement formal education and develop key life skills.',
      color: 'from-orange/20 to-coral/10',
      borderColor: 'border-orange/30',
    },
  ]

  return (
    <section className="py-20 md:py-28 bg-mist relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blush/30 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-coral/20 rounded-full blur-3xl translate-y-1/2" />
      
      <div className="mx-auto max-w-[1280px] px-6 relative">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-coral mb-3">
            Our Focus Areas
          </p>
          <h2 className="text-3xl md:text-5xl font-serif font-bold uppercase tracking-[0.1em] text-ink mb-6">
            What We Do
          </h2>
          <p className="text-deep/70 text-lg max-w-2xl mx-auto leading-relaxed">
            Our programs are built on the principles of inclusion, quality, and impact—empowering young people to become active global citizens.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {activities.map((activity, index) => (
            <div
              key={index}
              className={`group bg-gradient-to-br ${activity.color} p-8 rounded-3xl border ${activity.borderColor} hover:shadow-xl hover:shadow-coral/5 transition-all duration-300 hover:-translate-y-2`}
            >
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {activity.icon}
              </div>
              <h3 className="text-xl font-serif font-bold text-ink mb-4">
                {activity.title}
              </h3>
              <p className="text-deep/70 leading-relaxed">
                {activity.description}
              </p>
              <div className="mt-6 flex items-center gap-2 text-coral font-medium text-sm uppercase tracking-[0.12em] opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Learn more</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
