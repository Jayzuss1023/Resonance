# Resonance

Voice cloning and text to speech app. You pick or record a voice, input text, and get back a generated audio.

The web app is Next.js. Speech generation runs on a Chatterbox TTS API hosted on Modal. Audio lives in Cloudflare R2.

## What it does

- **Text to speech** — generate speech from up to 5,000 characters, with controls for temperature, top-p, top-k, and repetition penalty
- **Voice library** — system voices plus org-scoped custom voices
- **Custom voices** — upload a clip or record in the browser by implementing RecordRTC and WaveSurfer. Clips need to be long enough for Chatterbox. Upload path checks duration for files up to 20 MB.
- **Generation history** — past runs are stored per org and can be played back
- **Auth / orgs** — Clerk handles sign-in and organizations. If you’re logged in without an org, you get sent to `/org-selection`

## Stack

| Layer | Technology |
| --- | --- |
| App | Next.js 16, React 19, TypeScript |
| API | tRPC + TanStack Query |
| Auth | Clerk org required for the main app |
| Database | PostgreSQL via Prisma |
| Storage | Cloudflare R2 (voice refs/generated audio) |
| TTS | Chatterbox Turbo on Modal (`chatterbox_tts.py`) |
| UI | Tailwind, shadcn/Radix, Lucide |
| Forms / validation | TanStack Form, Zod |
| Observability | Sentry |

## Local setup

You’ll need Node, a Postgres database, Clerk keys, an R2 bucket, and a running Chatterbox endpoint.

## Notes
- Voices are either SYSTEM premade generations or CUSTOM tied to an org and user generated.
- Generated audio is stored in R2 and served through /api/audio/[generationId], not as public R2 URLs.
- Org context is required for tRPC procedures that create/list voices and generations.
- The Next app talks to Chatterbox through a typed OpenAPI client `lib/chatterbox-client.ts`. Types are generated with `npm run sync-api`.
