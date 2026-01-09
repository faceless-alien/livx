export function ImpactStats() {
  const stats = [
    { value: '500+', label: 'Young people empowered', icon: '👥', color: 'from-coral to-orange' },
    { value: '15+', label: 'Countries reached', icon: '🌍', color: 'from-orange to-coral' },
    { value: '50+', label: 'Partner organizations', icon: '🤝', color: 'from-coral to-orange' },
  ]

  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-ink to-deep text-paper relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 right-20 w-32 h-32 bg-coral/20 rounded-full blur-2xl" />
        <div className="absolute bottom-10 left-20 w-48 h-48 bg-orange/10 rounded-full blur-3xl" />
      </div>
      
      <div className="mx-auto max-w-[1280px] px-6 relative">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-coral mb-3">
            Our Reach
          </p>
          <h2 className="text-3xl md:text-5xl font-serif font-bold uppercase tracking-[0.1em] text-paper">
            Impact in Numbers
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative bg-paper/5 backdrop-blur-sm rounded-3xl p-10 text-center border border-paper/10 hover:border-coral/50 hover:bg-paper/10 transition-all duration-300"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <p className={`text-6xl md:text-7xl font-serif font-bold mb-4 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.value}
              </p>
              <p className="text-paper/70 text-lg uppercase tracking-[0.1em]">{stat.label}</p>
              
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-coral/0 via-coral/5 to-orange/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
