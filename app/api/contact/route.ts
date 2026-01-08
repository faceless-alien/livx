import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'

import config from '@/payload/payload.config'

const allowedTypes = new Set(['general', 'partner', 'application'])
const rateLimitWindowMs = 15 * 60 * 1000
const rateLimitMax = 5
const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() || 'unknown'
  }
  return request.headers.get('x-real-ip') ?? 'unknown'
}

function isRateLimited(key: string, now: number): boolean {
  const current = rateLimitStore.get(key)
  if (!current || now > current.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + rateLimitWindowMs })
    return false
  }

  if (current.count >= rateLimitMax) {
    return true
  }

  rateLimitStore.set(key, { count: current.count + 1, resetAt: current.resetAt })
  return false
}

export async function POST(request: NextRequest) {
  try {
    const now = Date.now()
    const clientIp = getClientIp(request)

    if (isRateLimited(clientIp, now)) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
    }

    const body = await request.json()
    const { name, email, message, type, website } = body

    if (typeof website === 'string' && website.trim().length > 0) {
      return NextResponse.json({ message: 'Message received successfully' }, { status: 200 })
    }

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const normalizedType = typeof type === 'string' && allowedTypes.has(type) ? type : 'general'

    const payload = await getPayload({ config })

    await payload.create({
      collection: 'contact-submissions',
      data: {
        name,
        email,
        message,
        type: normalizedType,
      },
    })

    return NextResponse.json({ message: 'Message received successfully' }, { status: 200 })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
