# Edgrow Web Application

Edgrow is a Next.js App Router application built with React, Tailwind CSS, GSAP, Motion, and Sanity.

## Prerequisites

- Node.js 20.9 or newer (Node 22 LTS is recommended)
- npm 10 or newer

## Install and run locally

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). No environment variables are required for the current website.

If your network returns `UNABLE_TO_VERIFY_LEAF_SIGNATURE` or rejects scoped packages from the default npm registry, use the TLS-enabled mirror that was used to generate the lockfile:

```bash
npm ci --registry=https://registry.npmmirror.com
```

Do not work around certificate errors by permanently setting `strict-ssl=false`.

## Connect Sanity services

The Services page reads published `service` documents from Sanity. Until Sanity is configured or while the dataset is empty, the existing local services remain visible as fallback content.

1. Create or select a project at [sanity.io/manage](https://www.sanity.io/manage).
2. Create the local environment file:

   ```bash
   cp .env.example .env.local
   ```

3. Add the website (`NEXT_PUBLIC_SANITY_*`), Studio (`SANITY_STUDIO_*`), and server-only token values to `.env.local`. `SANITY_API_WRITE_TOKEN` needs permission to create documents and upload assets for career applications.
4. Start the website and Studio in separate terminals:

   ```bash
   npm run dev
   npm run studio
   ```

Open the Studio directly at [http://localhost:3333](http://localhost:3333), or use the website bridge at [http://localhost:3000/studio](http://localhost:3000/studio). Then create and publish Service documents. Only published services with an Active status are displayed; `Display order` controls their order.

## Contact, careers, and client reviews

- Contact messages are delivered to `NEXT_PUBLIC_FORM_RECIPIENT` through FormSubmit. It defaults to `edgrowproduct@gmail.com`.
- Career applications are stored in Sanity Studio under **Job Application**. PDF resumes up to 5 MB are uploaded as Sanity file assets and linked to each application.
- Homepage reviews are managed in Sanity Studio under **Client Review**. Set the review to **Active** and publish it; `Display Order` controls its carousel position.

## Validate and run production

```bash
npm run typecheck
npm run build
npm start
```

`npm run build` creates the production Next.js application. `npm start` serves it on port 3000.

## Project structure

- `app/` — Next.js App Router pages, global styles, and layout configuration.
- `components/` — Reusable components (e.g. `Navbar.tsx`, `Footer.tsx`, and the custom `ThemeToggle.tsx`).
- `public/` — Static assets (images, vectors, etc.).
- `lib/` — Utility helper functions.
- `app/api/applications/` — Server-only Sanity application and resume upload endpoint.
