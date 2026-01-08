import { GlobalConfig } from 'payload'

export const HomeSettings: GlobalConfig = {
  slug: 'home-settings',
  access: {
    read: () => true,
    update: () => true,
  },
  fields: [
    {
      name: 'heroTitle',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'heroSubtitle',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'impactStats',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'featuredProjects',
      type: 'relationship',
      relationTo: 'projects',
      hasMany: true,
      maxRows: 3,
    },
    {
      name: 'featuredOpenCalls',
      type: 'relationship',
      relationTo: 'open-calls',
      hasMany: true,
      maxRows: 3,
    },
    {
      name: 'galleryImages',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
