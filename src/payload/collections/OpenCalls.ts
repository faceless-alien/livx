import { CollectionConfig } from 'payload'

export const OpenCalls: CollectionConfig = {
  slug: 'open-calls',
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Open', value: 'open' },
        { label: 'Closed', value: 'closed' },
        { label: 'Draft', value: 'draft' },
      ],
      defaultValue: 'draft',
      required: true,
    },
    {
      name: 'deadline',
      type: 'date',
      required: true,
    },
    {
      name: 'startDate',
      type: 'date',
    },
    {
      name: 'endDate',
      type: 'date',
    },
    {
      name: 'location',
      type: 'text',
    },
    {
      name: 'eligibleCountries',
      type: 'array',
      fields: [
        {
          name: 'country',
          type: 'text',
        },
      ],
    },
    {
      name: 'ageRange',
      type: 'group',
      fields: [
        {
          name: 'min',
          type: 'number',
        },
        {
          name: 'max',
          type: 'number',
        },
      ],
    },
    {
      name: 'costsCovered',
      type: 'array',
      fields: [
        {
          name: 'cost',
          type: 'text',
        },
      ],
    },
    {
      name: 'howToApply',
      type: 'richText',
      localized: true,
    },
    {
      name: 'selectionTimeline',
      type: 'array',
      fields: [
        {
          name: 'phase',
          type: 'text',
        },
        {
          name: 'date',
          type: 'date',
        },
      ],
    },
    {
      name: 'applyUrl',
      type: 'text',
    },
    {
      name: 'attachments',
      type: 'array',
      fields: [
        {
          name: 'document',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'title',
          type: 'text',
        },
      ],
    },
  ],
}
