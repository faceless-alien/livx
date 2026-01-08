'use client'

import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'general',
    message: '',
    website: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitted(true)
        setFormData({ name: '', email: '', type: 'general', message: '', website: '' })
        setTimeout(() => setSubmitted(false), 3000)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  return (
    <div className="bg-mist">
      <div className="mx-auto max-w-[1280px] px-6 py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl font-serif font-bold uppercase tracking-[0.14em] text-ink">
          Get In Touch
        </h1>

        <div className="mt-10 grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            {submitted && (
              <div className="mb-6 rounded-[10px] border border-muted/30 bg-paper p-4 text-deep">
                Thank you! We’ll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 rounded-[10px] border border-muted/30 bg-paper p-8">
              <div className="hidden" aria-hidden="true">
                <label className="block text-xs font-semibold text-ink mb-2 uppercase tracking-[0.16em]">
                  Leave this field empty
                </label>
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  autoComplete="off"
                  tabIndex={-1}
                  className="w-full rounded-[10px] border border-muted/30 bg-paper px-4 py-3 text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blush"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-ink mb-2 uppercase tracking-[0.16em]">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-[10px] border border-muted/30 bg-paper px-4 py-3 text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blush"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink mb-2 uppercase tracking-[0.16em]">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-[10px] border border-muted/30 bg-paper px-4 py-3 text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blush"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink mb-2 uppercase tracking-[0.16em]">
                  Inquiry Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full rounded-[10px] border border-muted/30 bg-paper px-4 py-3 text-ink focus:outline-none focus:ring-2 focus:ring-blush"
                >
                  <option value="general">General Inquiry</option>
                  <option value="partner">Partner Request</option>
                  <option value="application">Application Question</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink mb-2 uppercase tracking-[0.16em]">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full rounded-[10px] border border-muted/30 bg-paper px-4 py-3 text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blush"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-[10px] bg-ink px-8 py-4 text-paper uppercase text-sm font-medium tracking-[0.14em] hover:opacity-90 transition-opacity"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-serif font-bold uppercase tracking-[0.12em] text-ink mb-4">Get In Touch</h3>
              <p className="text-deep/80 mb-6 leading-relaxed">
                Have questions about our programs? Want to partner with us? Or interested in applying? We’re here to help.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-ink uppercase text-xs tracking-[0.16em] mb-2">Email</h4>
              <a
                href="mailto:hello@livx.org"
                className="border-0 text-ink hover:text-deep hover:underline hover:underline-offset-4"
              >
                hello@livx.org
              </a>
            </div>

            <div>
              <h4 className="font-bold text-ink uppercase text-xs tracking-[0.16em] mb-2">Safeguarding</h4>
              <a
                href="mailto:safeguarding@livx.org"
                className="border-0 text-ink hover:text-deep hover:underline hover:underline-offset-4"
              >
                safeguarding@livx.org
              </a>
            </div>

            <div>
              <h4 className="font-bold text-ink uppercase text-xs tracking-[0.16em] mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="border-0 text-ink/80 hover:text-deep hover:underline hover:underline-offset-4 transition-colors font-medium"
                >
                  Instagram
                </a>
                <a
                  href="#"
                  className="border-0 text-ink/80 hover:text-deep hover:underline hover:underline-offset-4 transition-colors font-medium"
                >
                  LinkedIn
                </a>
                <a
                  href="#"
                  className="border-0 text-ink/80 hover:text-deep hover:underline hover:underline-offset-4 transition-colors font-medium"
                >
                  Twitter
                </a>
              </div>
            </div>

            <div className="rounded-[10px] border border-muted/30 bg-paper p-6 mt-8">
              <h4 className="font-bold text-ink uppercase text-xs tracking-[0.16em] mb-2">Response Time</h4>
              <p className="text-sm text-deep/80">We aim to respond to all inquiries within 48 hours during business days.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
