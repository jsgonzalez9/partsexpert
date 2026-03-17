# PartsExpert - Technical Parts Wiki

## Environment Variables

Create a `.env.local` file:

```
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_N7UND0UgjKTVK-Uodkm0Hg_xSvEMPvz
```

## Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel --prod
```

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:3000
