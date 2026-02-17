# Denver Custom Remodeling Website

This is a Next.js website for a remodeling business with:
- Homepage (`/`)
- Contact/consultation page (`/contact`)
- Floating chat widget
- Backend API route that sends chat/consult messages to email

This README is written for beginners, so you can keep updating the site later.

## 1) Tech Stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind v4 + custom CSS
- Resend API (email delivery for chat/contact form)

## 2) Project Structure

Main files and what they do:

- `app/layout.tsx`
  - Global page layout and tab metadata (site title)
- `app/page.tsx`
  - Homepage UI (services, projects, contact section, chat widget mount)
- `app/contact/page.tsx`
  - Dedicated “Book a Consult” page with a detailed request form
- `app/components/ChatWidget.tsx`
  - Floating chat box UI + frontend submit logic
- `app/api/chat/route.ts`
  - Backend endpoint (`POST /api/chat`) that receives form/chat data
- `lib/chat.ts`
  - Email sending logic (currently uses Resend HTTP API)
- `app/globals.css`
  - Site styles (layout, buttons, cards, chat styles, contact page styles)
- `.env.local`
  - Your private environment variables (not committed)
- `.env.example`
  - Template of required env vars

## 3) Run The Site Locally

From project folder:

```bash
npm install
npm run dev
```

Open:

- `http://localhost:3000` (homepage)
- `http://localhost:3000/contact` (consult form page)

## 4) Environment Variables (Required For Chat/Email)

Create `.env.local` in project root:

```env
RESEND_API_KEY=re_your_real_key
CHAT_TO_EMAIL=denvercustomremodeling@gmail.com
CHAT_FROM_EMAIL=onboarding@resend.dev
```

Notes:
- `RESEND_API_KEY` must be your real key from Resend dashboard.
- With Resend test sender (`onboarding@resend.dev`), there are recipient limits.
- For production, verify your own domain in Resend and use a sender like `noreply@yourdomain.com`.

After any `.env.local` change, restart dev server:

```bash
npm run dev
```

## 5) How Forms Work (Simple Flow)

1. User submits message from:
   - chat widget (`app/components/ChatWidget.tsx`)
   - contact page (`app/contact/page.tsx`)
2. Frontend sends `POST /api/chat`
3. API route validates input in `app/api/chat/route.ts`
4. API calls `sendChatEmail(...)` in `lib/chat.ts`
5. Resend sends message to `CHAT_TO_EMAIL`

## 6) Pages You Have Today

### Homepage (`/`)
- File: `app/page.tsx`
- Contains:
  - Hero section
  - Services section
  - Recent projects section
  - Contact details
  - Floating chat widget

### Contact Page (`/contact`)
- File: `app/contact/page.tsx`
- Contains:
  - Phone/email contact info
  - “Book Your Consultation” form
  - Fields:
    - Full name
    - Email
    - Callback number
    - Best day
    - Best time
    - Project details

## 7) How To Change Common Things

### Change phone/email shown on site
- Update values in:
  - `app/page.tsx`
  - `app/contact/page.tsx`

### Change browser tab title
- Edit `metadata.title` in:
  - `app/layout.tsx`

### Change colors and style
- Edit CSS variables and classes in:
  - `app/globals.css`

### Change chat success/error messages
- Edit strings in:
  - `app/components/ChatWidget.tsx`
  - `app/contact/page.tsx`

## 8) How To Add A New Page (Beginner Steps)

Example: Add an “About” page at `/about`

1. Create folder and file:
   - `app/about/page.tsx`
2. Add component:

```tsx
export default function AboutPage() {
  return (
    <div className="site-shell">
      <h1>About Us</h1>
      <p>We are Denver Custom Remodeling...</p>
    </div>
  );
}
```

3. Open `http://localhost:3000/about`

To link it from homepage, add in `app/page.tsx`:

```tsx
<a href="/about">About</a>
```

## 9) How To Add New Form Fields Later

If you add more fields (for example: budget, address, project type), update all 3 places:

1. Frontend form state + inputs:
   - `app/contact/page.tsx` or `app/components/ChatWidget.tsx`
2. API validation:
   - `app/api/chat/route.ts`
3. Email body mapping:
   - `lib/chat.ts`

## 10) Build And Quality Checks

Run lint:

```bash
npm run lint
```

Run production build:

```bash
npm run build
```

If both pass, code is in good shape for deploy.

## 11) Deploy (Vercel)

1. Push code to GitHub.
2. Import repo in Vercel.
3. Add environment variables in Vercel project settings:
   - `RESEND_API_KEY`
   - `CHAT_TO_EMAIL`
   - `CHAT_FROM_EMAIL`
4. Deploy.

Important: Production needs proper Resend sender/domain setup.

## 12) Security Basics

- Never commit `.env.local`
- Keep API keys only in env vars
- Keep backend validation in `app/api/chat/route.ts`
- Use scoped API keys when possible

## 13) Future Expansion Ideas

- Add gallery images in `public/` and display with `next/image`
- Add testimonials page
- Add admin inbox (database) instead of email-only
- Add spam protection (hCaptcha/reCAPTCHA)
- Add analytics and conversion tracking
