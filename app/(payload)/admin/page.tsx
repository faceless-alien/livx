import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import type { SanitizedConfig } from 'payload'

import config from '@/payload/payload.config'
import { importMap } from './importMap.js'

export const dynamic = 'force-dynamic'

type AdminParams = { segments: string[] }

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
    // Must NOT be an array so formatAdminURL returns exactly '/admin' without trailing slash
    params: Promise.resolve({ segments: undefined } as unknown as AdminParams),
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
    // Must NOT be an array so formatAdminURL returns exactly '/admin' without trailing slash
    params: Promise.resolve({ segments: undefined } as unknown as AdminParams),
    searchParams: Promise.resolve(normalizedSearchParams),
  })
}
