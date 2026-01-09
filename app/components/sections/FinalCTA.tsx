import Link from 'next/link'

export function FinalCTA() {
  return (
    <section className="py-20 md:py-28 bg-paper relative overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-6 relative">
        <div className="relative rounded-3xl bg-gradient-to-br from-coral via-orange to-coral p-12 md:p-16 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-paper/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-paper/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange/30 rounded-full blur-3xl" />
          
          {/* Floating dots */}
          <div className="absolute top-8 right-12 w-3 h-3 bg-paper/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          <div className="absolute bottom-12 left-16 w-2 h-2 bg-paper/30 rounded-full animate-bounce" style={{ animationDelay: '0.6s' }} />
          <div className="absolute top-1/2 right-1/4 w-4 h-4 bg-paper/20 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
          
          <div className="relative max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-paper/80 mb-4">
              Ready to Begin?
            </p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-paper leading-tight">
              Stop scrolling.
              <br />
              <span className="text-ink/90">Start applying.</span>
            </h2>
            <p className="mt-6 text-paper/90 text-lg leading-relaxed">
              Explore open calls, find the right program, and join a community of young people building skills and impact across borders.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/open-calls"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-paper px-8 py-4 text-ink uppercase text-sm font-bold tracking-[0.14em] hover:bg-ink hover:text-paper transition-all duration-300 shadow-lg shadow-ink/20"
              >
                <span>Apply Now</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border-2 border-paper/50 bg-transparent px-8 py-4 text-paper uppercase text-sm font-medium tracking-[0.14em] hover:bg-paper/10 transition-colors"
              >
                Ask a Question
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
