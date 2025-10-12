
# Deployment Instructions (Vercel + Render + Supabase)

## 1. Create Supabase project
- Create project and note `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_KEY`.
- Create tables: users, bots, messages, plans, subscriptions (or use migration scripts).
- Create a storage bucket `bot_uploads` for file uploads.

## 2. Backend - Render
- Create a Render service, connect to this repo's `backend` folder.
- Add environment variables (see backend/.env.example).
- Deploy; note the service URL and set FRONTEND env var on Vercel accordingly.

## 3. Frontend - Vercel
- Create a Vercel project, connect to the `frontend` folder.
- Add env vars (NEXT_PUBLIC_API_URL, SUPABASE keys). Deploy.

## 4. Stripe
- Create Stripe account; add `STRIPE_SECRET_KEY` to backend env.
- Add webhook endpoint `/v1/billing/webhook` to be implemented for production.

## 5. OpenAI
- Add `OPENAI_API_KEY` to backend env to enable LLM responses.

## 6. Domain & TLS
- Configure custom domain on Vercel (dashboard.fliv.in). Render provides its own TLS for backend.

## 7. Further work
- Replace in-memory stores with DB queries.
- Implement file uploads & embedding pipeline.
- Integrate Pinecone/Chroma for vector DB and implement RAG.
- Add RBAC, rate-limiting, CSP, and security scans.
