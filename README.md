# LIVX - Erasmus+ Youth Organization Website

A production-ready website for LIVX, an Erasmus+ youth organization. Built with Next.js, Tailwind CSS, Payload CMS, and PostgreSQL.

## Quick Start

```bash
npm install
npm run db:up
npm run dev
```

Visit http://localhost:3000 for the frontend and http://localhost:3000/admin for the Payload CMS admin panel.

## Key Features

- ✅ Minimal editorial design with LIVX brand colors
- ✅ Responsive homepage with hero, mission, projects, impact stats
- ✅ Pages: Home, About, Projects, Open Calls, For Partners, Contact
- ✅ Payload CMS admin panel with collections for Projects, Open Calls, Team Members, Contact Submissions
- ✅ Contact form with database persistence
- ✅ Image optimization and media management
- ✅ SEO-optimized with metadata and Open Graph tags
- ✅ TypeScript for type safety
- ✅ ESLint + Prettier for code quality

## Tech Stack

- Next.js 15 (TypeScript, App Router)
- Tailwind CSS 4
- Payload CMS 3
- PostgreSQL
- ESLint + Prettier

## Environment Setup

1. Start PostgreSQL (Docker)
	- `docker compose up -d`
2. Update `.env.local` if you changed DB credentials
3. Run `npm run dev`

## Documentation

See [README.md](./README.md) in the root for full documentation on:
- Project structure
- CMS collections and fields
- Available pages and routes
- Deployment instructions
- API integration
- Troubleshooting

## Support

**Email**: hello@livx.org | **Safeguarding**: safeguarding@livx.org


```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
