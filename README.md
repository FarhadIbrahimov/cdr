# Denver Custom Remodeling Website

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Chat -> Email Integration

The chat widget submits to `POST /api/chat`, which sends email through Resend.

1. Copy `.env.example` to `.env.local`
2. Set `RESEND_API_KEY`
3. Optional: set `CHAT_TO_EMAIL` and `CHAT_FROM_EMAIL`

Example `.env.local`:

```bash
RESEND_API_KEY=re_xxxxxxxxx
CHAT_TO_EMAIL=denvercustomremodeling@gmail.com
CHAT_FROM_EMAIL=onboarding@resend.dev
```

## Extend Later

The chat delivery logic lives in `lib/chat.ts`, so new providers/integrations can be added without changing page UI.