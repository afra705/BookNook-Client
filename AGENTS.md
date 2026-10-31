<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# BookNook

Small Next.js 16 App Router book-catalog UI. There is no backend or database in this repo: data pages call a hardcoded REST API at `http://localhost:5000`.

## Commands

- `npm run dev` — dev server on http://localhost:3000 (Turbopack)
- `npm run build` / `npm run start`
- `npm run lint` — plain `eslint`; there is no `next lint`
- `npx tsc --noEmit` — typecheck; currently clean
- No test suite or test script exists.

`npm run lint` currently exits 1 on two vendored shadcn files (`src/components/ui/carousel.tsx`, `src/hooks/use-mobile.ts`: `react-hooks/set-state-in-effect`). This is pre-existing; don't fix it during unrelated work, but don't add new errors.

## Backend contract

All API calls are hardcoded — there is no env var or config layer:

- `GET http://localhost:5000/books`
- `GET http://localhost:5000/books/:id`
- `GET http://localhost:5000/new-arrivals`
- `POST http://localhost:5000/books`

Book shape: `{ _id, title, author, category, image, description }`.

`/` and `/books` are dynamic routes that throw at runtime if the API is down. `next build` still succeeds without the backend. There is no mock or fallback data in this repo.

## Structure

- Routes: `src/app/page.tsx` (`/`), `src/app/books`, `src/app/books/[id]`, `src/app/add-book`.
- `src/app/home/*` and `src/app/shared/*` are components colocated under `app`, not routes.
- `src/app/books/[id]/page.tsx` is a stub: it fetches and logs a book but renders an empty `<div>`.
- Navbar links to `/my-books`, `/my-borrows`, `/login`, `/register`; those routes do not exist yet.
- `@/*` maps to `src/*`.
- `src/components/ui/*` is shadcn output (`components.json`, style `base-nova`). Prefer `npx shadcn add <component>` over hand-editing these files.
- `cn` is re-exported in `src/lib/utils.ts` from the `cn` package, not clsx/tailwind-merge.
- `README.md` is default create-next-app boilerplate; it references `app/page.tsx`, but the app lives under `src/app`.

## Styling / framework quirks

- Tailwind v4, no `tailwind.config.*`. Tokens live in `src/app/globals.css` (`@theme inline`) and are loaded through the Turbopack CSS rule in `next.config.ts`; there is no PostCSS config.
- The BookNook palette is written as inline hex values (`#283D32`, `#F8F5ED`, `#C8795B`, `#879878`), not the shadcn CSS variables.
- `next/image` remote URLs must be allowlisted in `next.config.ts` `images.remotePatterns` (currently `covers.openlibrary.org`, `books.google.com`, `www.wenesyzadolik.org.uk`). Book covers use plain `<img>`, so they bypass this.
- React Compiler is enabled in `next.config.ts`.
- Next 16: route `params` are Promises (`const { id } = await params`), and helpers like `LayoutProps<"/">` are generated. Before using unfamiliar APIs, read `node_modules/next/dist/docs/`, starting with `01-app/02-guides/upgrading/version-16.md`.
