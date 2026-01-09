import '@payloadcms/next/css'
import '@payloadcms/ui/scss/app.scss'

import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'
import type { SanitizedConfig } from 'payload'

import config from '@/payload/payload.config'
import { importMap } from './admin/importMap.js'

export { metadata } from '@payloadcms/next/layouts'

async function serverFunction(args: { name: string; args: Record<string, unknown> }) {
  'use server'

  return handleServerFunctions({
    ...args,
    config: Promise.resolve(config as unknown as SanitizedConfig),
    importMap,
  })
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  return RootLayout({
    children,
    config: Promise.resolve(config as unknown as SanitizedConfig),
    importMap,
    serverFunction,
  })
}
