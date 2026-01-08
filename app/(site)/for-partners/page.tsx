export default function ForPartners() {
  return (
    <div className="bg-mist">
      <div className="mx-auto max-w-[1280px] px-6 py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl font-serif font-bold uppercase tracking-[0.14em] text-ink">
          For Partners
        </h1>

        <div className="mt-10 max-w-4xl space-y-10">
          <p className="text-xl text-deep/80 leading-relaxed">
            LIVX actively seeks partnerships with organizations, institutions, and networks committed to youth development
            and international cooperation.
          </p>

          <h2 className="text-3xl font-serif font-bold uppercase tracking-[0.14em] text-ink">
            Partnership Opportunities
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-paper p-6 rounded-[10px] border border-muted/30">
              <h3 className="text-lg font-serif font-bold tracking-[0.12em] text-ink mb-3">Host Communities</h3>
              <p className="text-deep/80 text-sm leading-relaxed">
                Welcome international youth participants to your city or organization. We manage logistics and cultural
                integration.
              </p>
            </div>
            <div className="bg-paper p-6 rounded-[10px] border border-muted/30">
              <h3 className="text-lg font-serif font-bold tracking-[0.12em] text-ink mb-3">Project Partners</h3>
              <p className="text-deep/80 text-sm leading-relaxed">
                Co-design and implement transformative youth programs aligned with your organizational mission.
              </p>
            </div>
            <div className="bg-paper p-6 rounded-[10px] border border-muted/30">
              <h3 className="text-lg font-serif font-bold tracking-[0.12em] text-ink mb-3">Training Providers</h3>
              <p className="text-deep/80 text-sm leading-relaxed">
                Lead workshops and training modules within our programs for young people from across Europe.
              </p>
            </div>
            <div className="bg-paper p-6 rounded-[10px] border border-muted/30">
              <h3 className="text-lg font-serif font-bold tracking-[0.12em] text-ink mb-3">Research & Evaluation</h3>
              <p className="text-deep/80 text-sm leading-relaxed">
                Collaborate on impact assessment and research to strengthen evidence-based youth work.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-serif font-bold uppercase tracking-[0.14em] text-ink">Why Partner with LIVX?</h2>

          <ul className="space-y-4 text-deep/80">
            <li className="flex gap-4">
              <span className="text-ink font-bold flex-shrink-0">✓</span>
              <span>Access to a network of motivated young people across Europe</span>
            </li>
            <li className="flex gap-4">
              <span className="text-ink font-bold flex-shrink-0">✓</span>
              <span>Professional support in program design and implementation</span>
            </li>
            <li className="flex gap-4">
              <span className="text-ink font-bold flex-shrink-0">✓</span>
              <span>Potential funding through Erasmus+ and other EU programs</span>
            </li>
            <li className="flex gap-4">
              <span className="text-ink font-bold flex-shrink-0">✓</span>
              <span>Quality assurance and recognized training certifications</span>
            </li>
            <li className="flex gap-4">
              <span className="text-ink font-bold flex-shrink-0">✓</span>
              <span>Visibility and promotion to partner network</span>
            </li>
          </ul>

          <div className="rounded-[10px] border border-muted/30 bg-blush p-10">
            <h3 className="text-2xl font-serif font-bold uppercase tracking-[0.14em] text-ink mb-4">Get In Touch</h3>
            <p className="text-deep/80 mb-6 leading-relaxed">Interested in exploring a partnership? We’d love to hear from you!</p>
            <a
              href="/contact"
              className="inline-flex rounded-[10px] bg-ink px-8 py-4 text-paper uppercase text-sm font-medium tracking-[0.14em] hover:opacity-90 transition-opacity border-0"
            >
              Send partner inquiry
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
