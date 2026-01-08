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

          {/* Legal */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.16em] uppercase mb-4 text-ink">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="border-0 text-ink/80 hover:text-deep hover:underline hover:underline-offset-4">Privacy Policy</Link></li>
              <li><Link href="/terms" className="border-0 text-ink/80 hover:text-deep hover:underline hover:underline-offset-4">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.16em] uppercase mb-4 text-ink">Follow Us</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="border-0 text-ink/80 hover:text-deep hover:underline hover:underline-offset-4">Instagram</a></li>
              <li><a href="#" className="border-0 text-ink/80 hover:text-deep hover:underline hover:underline-offset-4">LinkedIn</a></li>
              <li><a href="#" className="border-0 text-ink/80 hover:text-deep hover:underline hover:underline-offset-4">Twitter</a></li>
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
