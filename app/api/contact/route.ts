import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'

import config from '@/payload/payload.config'

const allowedTypes = new Set(['general', 'partner', 'application'])

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, message, type } = body

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
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

    return NextResponse.json(
      { message: 'Message received successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
