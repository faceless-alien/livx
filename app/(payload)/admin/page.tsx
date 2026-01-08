import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import type { SanitizedConfig } from 'payload'

import config from '@/payload/payload.config'
import { importMap } from './importMap.js'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams

  const normalizedSearchParams = Object.fromEntries(
    Object.entries(resolvedSearchParams ?? {}).filter(([, v]) => v !== undefined),
  ) as Record<string, string | string[]>

  return generatePageMetadata({
    config: Promise.resolve(config as unknown as SanitizedConfig),
    params: Promise.resolve({ segments: [] }),
    searchParams: Promise.resolve(normalizedSearchParams),
  })
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams

  const normalizedSearchParams = Object.fromEntries(
    Object.entries(resolvedSearchParams ?? {}).filter(([, v]) => v !== undefined),
  ) as Record<string, string | string[]>

  return RootPage({
    config: Promise.resolve(config as unknown as SanitizedConfig),
    importMap,
    params: Promise.resolve({ segments: [] }),
    searchParams: Promise.resolve(normalizedSearchParams),
  })
}
