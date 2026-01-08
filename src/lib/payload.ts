import { getPayload } from 'payload'

import config from '@/payload/payload.config'

declare global {
  var __livxPayloadPromise: ReturnType<typeof getPayload> | undefined
}

export async function getPayloadClient() {
  if (!globalThis.__livxPayloadPromise) {
    globalThis.__livxPayloadPromise = getPayload({ config })
  }

  return globalThis.__livxPayloadPromise
}

export function asText(value: unknown): string {
  if (typeof value === 'string') return value
  if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>
    const first = Object.values(record)[0]
    if (typeof first === 'string') return first
  }
  return ''
}
