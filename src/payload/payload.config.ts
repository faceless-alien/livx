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

// Globals
import { HomeSettings } from './globals/HomeSettings'

export default buildConfig({
  sharp,
  admin: {
    user: 'users',
  },
  collections: [
    Projects,
    OpenCalls,
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
  secret: process.env.PAYLOAD_SECRET || 'your-secret-key-change-in-production',
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/livx',
    },
  }),
})
