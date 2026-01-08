export default function About() {
  return (
    <div className="bg-mist">
      <div className="mx-auto max-w-[1280px] px-6 py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl font-serif font-bold uppercase tracking-[0.14em] text-ink">
          About LIVX
        </h1>

        <div className="mt-10 space-y-10 max-w-4xl">
          <p className="text-xl text-deep/80 leading-relaxed">
            LIVX is an Erasmus+ youth organization dedicated to fostering personal growth, international understanding,
            and social impact through transformative educational and volunteering experiences.
          </p>

          <h2 className="text-3xl font-serif font-bold uppercase tracking-[0.14em] text-ink">Our Mission</h2>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-serif font-bold text-ink mb-2">L</div>
              <div className="text-sm font-semibold uppercase tracking-[0.16em] text-ink">Live</div>
              <div className="mt-2 text-sm text-deep/80">Authentic experiences</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-serif font-bold text-ink mb-2">I</div>
              <div className="text-sm font-semibold uppercase tracking-[0.16em] text-ink">Improve</div>
              <div className="mt-2 text-sm text-deep/80">Personal development</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-serif font-bold text-ink mb-2">V</div>
              <div className="text-sm font-semibold uppercase tracking-[0.16em] text-ink">Value</div>
              <div className="mt-2 text-sm text-deep/80">Social contribution</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-serif font-bold text-ink mb-2">X</div>
              <div className="text-sm font-semibold uppercase tracking-[0.16em] text-ink">Exchange</div>
              <div className="mt-2 text-sm text-deep/80">Cultural dialogue</div>
            </div>
          </div>

          <h2 className="text-3xl font-serif font-bold uppercase tracking-[0.14em] text-ink">Our Team</h2>

          <p className="text-deep/80 leading-relaxed">
            Our team consists of passionate educators, youth workers, and international development professionals
            committed to creating meaningful opportunities for young people across Europe.
          </p>

          <h2 className="text-3xl font-serif font-bold uppercase tracking-[0.14em] text-ink">
            Safeguarding & Code of Conduct
          </h2>

          <p className="text-deep/80 leading-relaxed">
            LIVX is committed to creating safe, inclusive spaces where all participants are respected and protected.
            We have a robust safeguarding policy and Code of Conduct that all team members and participants must follow.
          </p>

          <div className="rounded-[10px] border border-muted/30 bg-paper p-8">
            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-ink">Questions?</div>
            <div className="mt-2 text-lg font-serif text-ink">Contact our Safeguarding Team</div>
            <div className="mt-4 text-deep/80">
              Email:{' '}
              <a
                href="mailto:safeguarding@livx.org"
                className="border-0 text-ink hover:text-deep hover:underline hover:underline-offset-4"
              >
                safeguarding@livx.org
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
