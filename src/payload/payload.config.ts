import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'

// Collections
import { Projects } from './collections/Projects'
import { OpenCalls } from './collections/OpenCalls'
import { TeamMembers } from './collections/TeamMembers'
import { ContactSubmissions } from './collections/ContactSubmissions'
import { Media } from './collections/Media'
import { Partners } from './collections/Partners'
import { Stories } from './collections/Stories'

// Globals
import { HomeSettings } from './globals/HomeSettings'

export default buildConfig({
  sharp,
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
  admin: {
    user: 'users',
  },
  collections: [
    Projects,
    OpenCalls,
    Partners,
    Stories,
    TeamMembers,
    ContactSubmissions,
    Media,
    {
      slug: 'users',
      auth: true,
      access: {
        read: ({ req }) => Boolean(req.user),
        create: async ({ req }) => {
          if (req.user) return true

          const existing = await req.payload.db.findOne({
            collection: 'users',
            req,
          })

          return !existing
        },
        update: ({ req }) => Boolean(req.user),
        delete: ({ req }) => Boolean(req.user),
      },
      fields: [
        {
          name: 'email',
          type: 'email',
          required: true,
          unique: true,
        },
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
  ],
  globals: [HomeSettings],
  editor: lexicalEditor({}),
  secret:
    process.env.PAYLOAD_SECRET ||
    (process.env.NODE_ENV === 'production'
      ? (() => {
          throw new Error('PAYLOAD_SECRET is required in production')
        })()
      : 'dev-secret-change-me'),
  db: postgresAdapter({
    pool: {
      connectionString:
        process.env.DATABASE_URL ||
        process.env.DATABASE_URI ||
        (process.env.NODE_ENV === 'production'
          ? (() => {
              throw new Error('DATABASE_URL (or DATABASE_URI) is required in production')
            })()
          : 'postgresql://postgres:password@localhost:5432/livx'),
    },
  }),
})
