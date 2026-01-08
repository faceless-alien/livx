'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/open-calls', label: 'Open Calls' },
    { href: '/for-partners', label: 'For Partners' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-muted/30 bg-paper/80 backdrop-blur">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4">
        <Link href="/" className="border-0 hover:opacity-100" aria-label="LIVX Home">
          <div className="flex items-center gap-3">
            <div className="font-serif text-xl font-bold uppercase tracking-[0.16em] text-ink">
              LIVX
            </div>
          </div>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden border-0 bg-transparent p-2 text-ink"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="border-0 text-xs font-medium uppercase tracking-[0.16em] text-ink/85 hover:text-deep hover:underline hover:decoration-muted/50 hover:underline-offset-4"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile full-screen overlay */}
      {isOpen ? (
        <div className="fixed inset-0 z-50 bg-paper">
          <div className="mx-auto flex h-full max-w-[1280px] flex-col px-6 py-6">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="border-0"
                onClick={() => setIsOpen(false)}
              >
                <div className="font-serif text-xl font-bold uppercase tracking-[0.16em] text-ink">LIVX</div>
              </Link>
              <button
                className="border-0 bg-transparent p-2 text-ink"
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
              >
                <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="mt-10 flex flex-1 flex-col justify-start">
              <div className="space-y-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block border-0 font-serif text-3xl uppercase tracking-[0.14em] text-ink hover:text-deep"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="mt-auto border-t border-muted/30 pt-6 text-sm text-muted">
                Explore. Learn. Make an impact.
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}
