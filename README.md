
# Fliv Chatbot Builder - Boilerplate (Next.js frontend + Node.js backend)

This is a starter boilerplate generated for your **Fliv** Chatbot Builder SaaS:
- Frontend: Next.js (TypeScript)
- Backend: Node.js + Express (TypeScript)
- Auth/DB: Supabase (stubs included)
- Payments: Stripe (stub included)
- LLM: OpenAI (stub included)

## What is included
- `frontend/` - Next.js app with example pages and fetch helpers
- `backend/` - Express API with endpoints matching the OpenAPI spec
- `openapi.yaml` - OpenAPI 3.1 spec for the main endpoints
- `deploy-instructions.md` - How to deploy to Vercel, Render, Supabase, and connect env vars
- Example `.env.example` files for frontend and backend

## How to use
1. Download and unzip the project.
2. Fill in environment variables (see `.env.example` files).
3. Push frontend to GitHub and connect to Vercel.
4. Push backend to GitHub and connect to Render (or Railway).
5. Create a Supabase project for Auth/DB/Storage and update env vars.
6. Configure Stripe and OpenAI keys in env vars.

This boilerplate is intentionally minimal and contains stubs and comments where you'll need to finish business logic (e.g. embedding pipeline, vector DB, RAG). Use this as a base to iterate quickly or feed to AI code platforms for extension.

---
