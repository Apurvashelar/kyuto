# Kyuto

D2C e-commerce store for Kyuto — a lifestyle brand selling handcrafted ceramics, scented candles, and curated gift hampers.

**Live site:** [kyuto.in](https://kyuto.in)

## Tech Stack

- **Framework:** Next.js (App Router)
- **Database & Auth:** Supabase
- **Payments:** Razorpay
- **Images:** Cloudinary
- **Email:** Resend
- **Hosting:** Vercel
- **Domains:** kyuto.in

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view locally.

## Environment Variables

Copy `.env.local` and fill in the following:

```
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
RAZORPAY_KEY_ID
RAZORPAY_KEY_SECRET
NEXT_PUBLIC_RAZORPAY_KEY_ID
NEXT_PUBLIC_WHATSAPP_NUMBER
RESEND_API_KEY
ORDER_NOTIFY_EMAIL
```

## Deployment

Hosted on Vercel, connected to the `main` branch of this repository. Every push to `main` triggers an automatic deployment to [kyuto.in](https://kyuto.in).
