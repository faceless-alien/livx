import { getPayloadClient, asText } from '@/lib/payload'
import Image from 'next/image'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

interface TeamMember {
  id: string
  name: string | Record<string, string>
  role: string | Record<string, string>
  photo?: {
    url: string
    alt?: string
  }
  shortBio?: string | Record<string, string>
  socials?: {
    platform: 'linkedin' | 'twitter' | 'instagram' | 'email'
    url: string
  }[]
}

const socialIcons: Record<string, string> = {
  linkedin: '💼',
  twitter: '🐦',
  instagram: '📸',
  email: '✉️',
}

export default async function About() {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'team-members',
    limit: 20,
    depth: 1,
  })
  const teamMembers = result.docs as unknown as TeamMember[]

  return (
    <div className="bg-mist">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-paper via-paper to-blush/30 py-20 md:py-32">
        <div className="absolute top-0 right-0 w-96 h-96 bg-coral/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blush/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        <div className="mx-auto max-w-[1280px] px-6 relative">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-coral mb-4">
              About Us
            </p>
            <h1 className="text-4xl md:text-6xl font-serif font-bold uppercase tracking-[0.1em] text-ink leading-tight">
              Empowering Youth<br />
              <span className="text-coral">Across Europe</span>
            </h1>
            <p className="mt-8 text-xl text-deep/80 leading-relaxed">
              LIVX is an Erasmus+ youth organization dedicated to fostering personal growth, international understanding,
              and social impact through transformative educational and volunteering experiences.
            </p>
          </div>
        </div>
      </section>

      {/* LIVX Values */}
      <section className="py-20 md:py-28 bg-mist">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-coral mb-3">
              Our Philosophy
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold uppercase tracking-[0.14em] text-ink">
              The LIVX Values
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { letter: 'L', word: 'Live', desc: 'Authentic experiences that shape who you become', color: 'from-coral/20 to-coral/5' },
              { letter: 'I', word: 'Improve', desc: 'Personal development through meaningful challenges', color: 'from-blush/40 to-blush/10' },
              { letter: 'V', word: 'Value', desc: 'Contributing to communities and society', color: 'from-orange/20 to-orange/5' },
              { letter: 'X', word: 'Exchange', desc: 'Cross-cultural dialogue and understanding', color: 'from-coral/20 to-coral/5' },
            ].map((item) => (
              <div
                key={item.letter}
                className={`bg-gradient-to-br ${item.color} rounded-3xl p-8 text-center hover:-translate-y-1 transition-transform duration-300 border border-muted/10`}
              >
                <div className="text-6xl font-serif font-bold text-ink mb-3">{item.letter}</div>
                <div className="text-sm font-bold uppercase tracking-[0.2em] text-ink mb-2">{item.word}</div>
                <p className="text-sm text-deep/70 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 md:py-28 bg-paper">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-coral mb-3">
              The People Behind LIVX
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold uppercase tracking-[0.14em] text-ink mb-4">
              Our Team
            </h2>
            <p className="text-deep/70 max-w-2xl mx-auto">
              Passionate educators, youth workers, and international development professionals
              committed to creating meaningful opportunities for young people.
            </p>
          </div>

          {teamMembers.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="group bg-gradient-to-br from-mist to-paper rounded-3xl overflow-hidden border border-muted/20 hover:border-coral/30 hover:shadow-xl hover:shadow-coral/5 transition-all duration-300"
                >
                  <div className="aspect-square relative bg-gradient-to-br from-blush/30 to-coral/10 overflow-hidden">
                    {member.photo?.url ? (
                      <Image
                        src={member.photo.url}
                        alt={member.photo.alt || asText(member.name)}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-6xl">
                        👤
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-serif font-bold text-ink">
                      {asText(member.name)}
                    </h3>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-coral mt-1">
                      {asText(member.role)}
                    </p>
                    {member.shortBio && (
                      <p className="mt-3 text-sm text-deep/70 leading-relaxed line-clamp-3">
                        {asText(member.shortBio)}
                      </p>
                    )}
                    {member.socials && member.socials.length > 0 && (
                      <div className="mt-4 flex gap-2">
                        {member.socials.map((social, idx) => (
                          <a
                            key={idx}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-full bg-mist flex items-center justify-center text-sm hover:bg-coral/20 transition-colors"
                            title={social.platform}
                          >
                            {socialIcons[social.platform] || '🔗'}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted">
              <p>Team members coming soon...</p>
            </div>
          )}
        </div>
      </section>

      {/* Safeguarding Section */}
      <section className="py-20 md:py-28 bg-mist">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-coral mb-3">
              Our Commitment
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold uppercase tracking-[0.14em] text-ink mb-6">
              Safeguarding & Code of Conduct
            </h2>
            <p className="text-deep/80 leading-relaxed mb-10">
              LIVX is committed to creating safe, inclusive spaces where all participants are respected and protected.
              We have a robust safeguarding policy and Code of Conduct that all team members and participants must follow.
            </p>

            <div className="bg-gradient-to-br from-paper to-blush/20 rounded-3xl p-8 md:p-12 border border-muted/20">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-serif font-bold text-ink mb-2">
                Questions or Concerns?
              </h3>
              <p className="text-deep/70 mb-6">
                Contact our Safeguarding Team anytime
              </p>
              <a
                href="mailto:safeguarding@livx.org"
                className="inline-flex items-center gap-2 bg-ink text-paper px-6 py-3 rounded-full text-sm font-medium uppercase tracking-[0.14em] hover:bg-coral transition-colors"
              >
                ✉️ safeguarding@livx.org
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-ink to-deep text-paper">
        <div className="mx-auto max-w-[1280px] px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold uppercase tracking-[0.14em] mb-6">
            Ready to Join the Movement?
          </h2>
          <p className="text-paper/70 max-w-2xl mx-auto mb-10">
            Whether you want to participate in our programs, partner with us, or just learn more—we&apos;d love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/open-calls"
              className="inline-flex items-center justify-center rounded-full bg-coral px-8 py-4 text-ink uppercase text-sm font-bold tracking-[0.14em] hover:bg-orange transition-colors"
            >
              Explore Opportunities
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border-2 border-paper/30 px-8 py-4 text-paper uppercase text-sm font-medium tracking-[0.14em] hover:bg-paper/10 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
