# Edgrow Web Application

Welcome to **Edgrow**, a high-performance web application designed for elite technical architecture and digital strategy. This project is built using **Next.js** (App Router), **Tailwind CSS**, and **motion/react** for smooth, fluid page transitions and layout animations.

---

## 🚀 Quick Start Guide

Follow these simple steps to run the application locally on your machine after cloning.

### 1. Prerequisites

Ensure you have the following installed on your system:
- **Node.js** (v18.0.0 or higher recommended)
- **npm** (comes with Node), **yarn**, **pnpm**, or **bun**

---

### 2. Installation

1. Navigate into the cloned directory:
   ```bash
   cd edgrow-web
   ```

2. Install the project dependencies:
   ```bash
   npm install
   # or using yarn / pnpm / bun:
   # yarn install
   # pnpm install
   # bun install
   ```

---

### 3. Configure Environment Variables

1. Duplicate the `.env.example` file and rename it to `.env` (or `.env.local`):
   ```bash
   cp .env.example .env
   ```

2. Open the newly created `.env` file and replace the placeholder values with your real keys:
   - `GEMINI_API_KEY`: Your Google Gemini API Key (if using AI features).
   - `APP_URL`: Set to `http://localhost:3000` for local development.

---

### 4. Running the Application

You can run the application in two ways depending on your needs.

#### Option A: Running with standard Next.js (Recommended for local development)
To run with hot-reloading and development tools:
```bash
npx next dev
```
Then, open **[http://localhost:3000](http://localhost:3000)** in your browser.

#### Option B: Building and running the production server
To check production performance or run the production build:
1. Build the application:
   ```bash
   npm run build
   ```
2. Start the built production server:
   ```bash
   npx next start
   ```

#### Option C: Running the static serve script (Used in cloud environment)
This project contains a lightweight custom static serve script (`serve.js`) which runs in the cloud sandbox environment:
1. Build the application:
   ```bash
   npm run build
   ```
2. Start the lightweight serve script:
   ```bash
   npm run dev
   ```

---

## 🛠️ Project Structure

- `app/` — Next.js App Router pages, global styles, and layout configuration.
- `components/` — Reusable components (e.g. `Navbar.tsx`, `Footer.tsx`, and the custom `ThemeToggle.tsx`).
- `public/` — Static assets (images, vectors, etc.).
- `lib/` — Utility helper functions.
- `serve.js` — Custom static server script.
