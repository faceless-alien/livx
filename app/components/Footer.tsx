import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-20 border-t border-muted/30 bg-paper py-16">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-base font-serif font-bold uppercase tracking-[0.16em] text-ink mb-4">LIVX</h3>
            <p className="text-muted text-sm">
              Live • Improve • Value • Exchange
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.16em] uppercase mb-4 text-ink">Site</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="border-0 text-ink/80 hover:text-deep hover:underline hover:underline-offset-4">Home</Link></li>
              <li><Link href="/about" className="border-0 text-ink/80 hover:text-deep hover:underline hover:underline-offset-4">About</Link></li>
              <li><Link href="/projects" className="border-0 text-ink/80 hover:text-deep hover:underline hover:underline-offset-4">Projects</Link></li>
              <li><Link href="/open-calls" className="border-0 text-ink/80 hover:text-deep hover:underline hover:underline-offset-4">Open Calls</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.16em] uppercase mb-4 text-ink">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/contact" className="border-0 text-ink/80 hover:text-deep hover:underline hover:underline-offset-4">Contact Us</Link></li>
              <li><Link href="/for-partners" className="border-0 text-ink/80 hover:text-deep hover:underline hover:underline-offset-4">For Partners</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.16em] uppercase mb-4 text-ink">Follow Us</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="https://www.instagram.com/livx.project/" target="_blank" rel="noopener noreferrer" className="border-0 text-ink/80 hover:text-deep hover:underline hover:underline-offset-4">Instagram ↗</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-muted/30 pt-8 text-center text-sm text-muted">
          <p>&copy; {currentYear} LIVX. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
