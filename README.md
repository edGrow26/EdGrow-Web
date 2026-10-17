# Edgrow Web Application

Edgrow is a modern, statically exported web application built with the Next.js App Router. It features fluid animations powered by GSAP and Motion, responsive styling with Tailwind CSS, and a fully integrated Sanity CMS for managing services and client reviews dynamically.

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

The Services page reads published `service` documents securely during the static website build. Until Sanity is configured or while the dataset is empty, the existing local services remain visible as fallback content.

1. Create or select a project at [sanity.io/manage](https://www.sanity.io/manage).
2. Create the local environment file:

   ```bash
   cp .env.example .env.local
   ```

3. Add the website (`NEXT_PUBLIC_SANITY_*`), Studio (`SANITY_STUDIO_*`), and server-only read-token values to `.env.local`. Both applications use this single root file, but each build system requires its own variable prefix.
4. Start the website and Studio in separate terminals:

   ```bash
   npm run dev
   npm run studio
   ```

Open the Studio directly at [http://localhost:3333](http://localhost:3333), or use the website bridge at [http://localhost:3000/studio](http://localhost:3000/studio). Then create and publish Service documents. Only published services with an Active status are displayed; `Display order` controls their order. Run `npm run build` after publishing content so the static website includes the latest services.

## Contact, careers, and client reviews

- Contact messages and career applications are delivered to `NEXT_PUBLIC_FORM_RECIPIENT` through FormSubmit. It defaults to `edgrowproduct@gmail.com`.
- The first real submission sends an activation email to the recipient address. Open that email and confirm the form once; later submissions are delivered automatically.
- Career resumes must be PDF files no larger than 5 MB and are attached to the application email.
- Homepage reviews are managed in Sanity Studio under **Client Review**. Set the review to **Active** and publish it; `Display Order` controls its carousel position.

## Validate and run the production export

```bash
npm run typecheck
npm run build
npm start
```

`npm run build` creates the static site in `dist/`. `npm start` serves that directory on port 3000. You can override the address with `HOST` and `PORT`.

## Project structure

- `app/` — Next.js App Router pages, global styles, and layout configuration.
- `components/` — Reusable components (e.g. `Navbar.tsx`, `Footer.tsx`, and the custom `ThemeToggle.tsx`).
- `public/` — Static assets (images, vectors, etc.).
- `lib/` — Utility helper functions.
- `serve.js` — Lightweight server for the generated `dist/` site.

## Update README.md 456