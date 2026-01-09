# LIVX - Youth Mobility & Exchange Platform

A production-ready website for LIVX, an Erasmus+ youth organization. Built with Next.js, Tailwind CSS, Payload CMS, and PostgreSQL.

## Development

```bash
# Install dependencies
npm install

# Start Docker PostgreSQL (development)
docker compose up -d

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the website and [http://localhost:3000/admin](http://localhost:3000/admin) for the CMS.

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Required variables:
- `DATABASE_URI` - PostgreSQL connection string
- `PAYLOAD_SECRET` - Secret key for Payload CMS (min 32 characters)
- `NEXT_PUBLIC_SERVER_URL` - Your site URL
- `PAYLOAD_PUBLIC_SERVER_URL` - Same as above

## Deployment to DigitalOcean

### Option 1: App Platform (Recommended)

1. Push your code to GitHub
2. Go to [DigitalOcean Apps](https://cloud.digitalocean.com/apps)
3. Click "Create App" → Select your GitHub repo
4. Configure environment variables in the App settings
5. Add a managed PostgreSQL database component
6. Deploy

The `.do/app.yaml` file provides a ready-to-use App Platform specification.

### Option 2: Docker Deployment

```bash
# Build the Docker image
docker build -t livx .

# Run the container
docker run -p 3000:3000 \
  -e DATABASE_URI="your-database-uri" \
  -e PAYLOAD_SECRET="your-secret" \
  -e NEXT_PUBLIC_SERVER_URL="https://yourdomain.com" \
  -e PAYLOAD_PUBLIC_SERVER_URL="https://yourdomain.com" \
  livx
```

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **CMS**: Payload CMS 3.x
- **Database**: PostgreSQL
- **Styling**: Tailwind CSS

## Project Structure

```
app/
├── (site)/          # Public website pages
│   ├── page.tsx     # Homepage
│   ├── about/       # About page
│   ├── projects/    # Projects listing
│   ├── open-calls/  # Open calls listing
│   ├── contact/     # Contact form
│   └── for-partners/# Partner information
├── api/             # API routes
├── components/      # React components
│   └── sections/    # Homepage sections
└── admin/           # Payload CMS admin (auto-generated)

src/
├── payload/
│   ├── collections/ # CMS content types
│   └── globals/     # Global settings
└── lib/             # Utilities
```

## Support

**Email**: hello@livx.org | **Safeguarding**: safeguarding@livx.org
