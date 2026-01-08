import { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: 'Media',
    defaultColumns: ['filename', 'alt', 'updatedAt'],
  },
  upload: {
    staticDir: 'public/media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        crop: 'center',
      },
      {
        name: 'card',
        width: 667,
        height: 667,
        crop: 'center',
      },
      {
        name: 'tablet',
        width: 768,
        height: 768,
        crop: 'center',
      },
    ],
    mimeTypes: ['image/*', 'application/pdf'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
}
