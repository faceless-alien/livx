import { CollectionConfig } from 'payload'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  admin: {
    useAsTitle: 'email',
    group: 'Inbox',
    defaultColumns: ['email', 'type', 'createdAt'],
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => true,
    update: () => false,
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'General Inquiry', value: 'general' },
        { label: 'Partner Request', value: 'partner' },
        { label: 'Application Question', value: 'application' },
      ],
      defaultValue: 'general',
    },
  ],
}
