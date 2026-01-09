import Image from 'next/image'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-paper via-paper to-blush/20">
      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-coral/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-blush/40 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange/10 rounded-full blur-3xl" />
      
      {/* Floating shapes */}
      <div className="absolute top-32 right-1/4 w-4 h-4 bg-coral rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
      <div className="absolute bottom-40 left-1/3 w-3 h-3 bg-orange rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 right-20 w-2 h-2 bg-blush rounded-full animate-bounce" style={{ animationDelay: '1.5s' }} />

      <div className="mx-auto max-w-[1280px] px-6 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-coral/20 to-orange/20 border border-coral/30 px-5 py-2.5 mb-8">
            <span className="w-2 h-2 bg-coral rounded-full animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-deep">
              Explore • Learn • Make an Impact
            </span>
          </div>

          {/* Main Title */}
          <div className="relative">
            <Image
              src="/logo.svg"
              alt=""
              aria-hidden
              width={1200}
              height={1200}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 blur-sm scale-150 pointer-events-none"
            />
            
            <h1 className="relative text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-ink leading-[1.1] mb-6">
              <span className="block">Live</span>
              <span className="block text-coral">Improve</span>
              <span className="block">Value</span>
              <span className="block bg-gradient-to-r from-orange to-coral bg-clip-text text-transparent">eXchange</span>
            </h1>
          </div>

          <p className="text-lg md:text-xl text-deep/80 max-w-2xl mx-auto leading-relaxed mb-10">
            LIVX is an Erasmus+ youth organization creating meaningful opportunities for personal growth, 
            cultural exchange, and social impact through international volunteering and non-formal education.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/open-calls"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-coral to-orange px-8 py-4 text-paper uppercase text-sm font-bold tracking-[0.14em] hover:shadow-lg hover:shadow-coral/30 transition-all duration-300 hover:-translate-y-0.5"
            >
              <span>Apply Now</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <Link
              href="/for-partners"
              className="inline-flex items-center justify-center rounded-full bg-ink px-8 py-4 text-paper uppercase text-sm font-medium tracking-[0.14em] hover:bg-deep transition-colors"
            >
              Become a Partner
            </Link>
          </div>

          {/* Stats preview */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            {[
              { value: '500+', label: 'Youth Empowered' },
              { value: '15+', label: 'Countries' },
              { value: '50+', label: 'Partners' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-serif font-bold text-ink">{stat.value}</div>
                <div className="text-xs text-muted uppercase tracking-[0.12em] mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted animate-bounce">
        <span className="text-xs uppercase tracking-[0.2em]">Scroll</span>
        <span className="text-lg">↓</span>
      </div>
    </section>
  )
}
