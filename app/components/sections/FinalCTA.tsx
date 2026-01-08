import Link from 'next/link'

export function FinalCTA() {
  return (
    <section className="py-16 md:py-24 bg-paper">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="rounded-[10px] border border-muted/30 bg-blush p-10 md:p-14">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-serif font-bold uppercase tracking-[0.14em] text-ink">
              Stop scrolling.
              <br />
              Start applying.
            </h2>
            <p className="mt-5 text-deep/80 text-lg leading-relaxed">
              Explore open calls, find the right program, and join a community of young people building skills and impact across borders.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/open-calls"
                className="inline-flex items-center justify-center rounded-[10px] bg-ink px-8 py-4 text-paper uppercase text-sm font-medium tracking-[0.14em] hover:opacity-90 transition-opacity border-0"
              >
                Apply now
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-[10px] border border-ink bg-transparent px-8 py-4 text-ink uppercase text-sm font-medium tracking-[0.14em] hover:bg-ink hover:text-paper transition-colors border-0"
              >
                Ask a question
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
