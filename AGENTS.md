# Project: AI Life Logger

## Stack
- Next.js 15 (App Router)
- React 19
- Tailwind CSS v4
- Supabase (coming soon)
- Claude API (coming soon)

## Code Rules

### Next.js / React
- Always use App Router. Never suggest Pages Router patterns.
- Use Server Components by default. Only add `"use client"` when the component needs interactivity (useState, useEffect, event handlers).
- Use `next/navigation` for routing (useRouter, redirect). Never use `next/router`.
- Data fetching goes in Server Components with async/await directly — no useEffect for fetching.
- Use Next.js built-in `fetch` with caching options, not axios.
- File-based routing only. API routes go in `app/api/route.js`.

### Styling
- Tailwind CSS only. No inline styles, no CSS modules.
- Mobile-first responsive design.

### General
- JavaScript only, no TypeScript.
- Functional components only. No class components.
- Keep components small and focused.
- Prefer named exports for components, default export only for page.js files.