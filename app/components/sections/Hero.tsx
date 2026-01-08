import Image from 'next/image'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="bg-paper border-b border-muted/30">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="min-h-[78vh] flex items-center justify-center py-16 md:py-24">
          <div className="max-w-4xl text-center">
            <div className="inline-flex rounded-full border border-muted/30 bg-mist px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-deep">
              Explore. Learn. Make an impact.
            </div>

            <div className="relative mt-10 inline-block">
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <Image
                  src="/logo.svg"
                  alt=""
                  aria-hidden
                  width={980}
                  height={980}
                  className="opacity-60 blur-md select-none scale-150"
                />
              </div>

              <h1 className="relative text-4xl md:text-5xl lg:text-6xl font-serif font-bold uppercase tracking-[0.14em] text-ink leading-tight">
                Live • Improve • Value • Exchange
              </h1>
            </div>

            <p className="mt-6 text-base md:text-lg text-deep/80 max-w-2xl mx-auto leading-relaxed">
              LIVX is an Erasmus+ youth organization creating meaningful opportunities for personal growth, cultural exchange, and social impact through international volunteering, mobility programs, and non-formal education.
            </p>

            <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center">
          <Link
            href="/open-calls"
            className="inline-flex items-center justify-center rounded-[10px] bg-ink px-8 py-4 text-paper uppercase text-sm font-medium tracking-[0.14em] hover:opacity-90 transition-opacity"
          >
            Apply now
          </Link>
          <Link
            href="/for-partners"
            className="inline-flex items-center justify-center rounded-[10px] bg-blush px-8 py-4 text-ink uppercase text-sm font-medium tracking-[0.14em] hover:opacity-90 transition-opacity"
          >
            Become a partner
          </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
