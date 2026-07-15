import { FileNode } from './types';

export const CORE_FILES: Record<string, Omit<FileNode, 'id'>> = {
  root: {
    name: 'edgrow-web',
    type: 'folder',
    children: ['app', 'components', 'lib', 'hooks', 'public', 'package_json', 'tsconfig_json', 'next_config'],
    isExpanded: true,
    description: 'Root Next.js 14+ App Router project folder for the EdGrow Web EdTech platform.'
  },
  app: {
    name: 'app',
    type: 'folder',
    parentId: 'root',
    children: ['app_layout', 'app_page', 'app_globals_css'],
    isExpanded: true,
    description: 'Next.js App Router containing route segments, shared layouts, error boundaries, and global styles.'
  },
  app_layout: {
    name: 'layout.tsx',
    type: 'file',
    parentId: 'app',
    content: `import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'EdGrow Collaborative Study Web App',
  description: 'AI-Enhanced course chapters tracker and educational student workspace.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}`,
    description: 'Root Next.js layout setting up global HTML structure, font optimizations, and page head metadata.'
  },
  app_page: {
    name: 'page.tsx',
    type: 'file',
    parentId: 'app',
    content: `'use client';

import React from 'react';

export default function Dashboard() {
  return (
    <main className="p-8 bg-slate-50 min-h-screen">
      <h1 className="text-2xl font-bold text-indigo-900">Welcome to EdGrow Student Portal</h1>
      <p className="text-slate-500 mt-2">Active syllabus courses loader and student cognitive skill graphs.</p>
    </main>
  );
}`,
    description: 'Primary landing screen for the student portal displaying progress stats, courses, and overall learning activity.'
  },
  app_globals_css: {
    name: 'globals.css',
    type: 'file',
    parentId: 'app',
    content: `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background-color: #f8fafc;
  color: #0f172a;
}`,
    description: 'Global stylesheet importing core Tailwind utility blocks and custom brand style overrides.'
  },
  components: {
    name: 'components',
    type: 'folder',
    parentId: 'root',
    children: ['components_ui'],
    isExpanded: false,
    description: 'Extracted modular UI components divided into layout wrappers, widgets, and base primitives.'
  },
  components_ui: {
    name: 'ui',
    type: 'folder',
    parentId: 'components',
    children: ['ui_card_component'],
    description: 'Standard system primitives including buttons, form inputs, dialog models, and custom wrappers.'
  },
  ui_card_component: {
    name: 'Card.tsx',
    type: 'file',
    parentId: 'components_ui',
    content: `import React from 'react';

export function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={\`bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow \${className}\`}>
      {children}
    </div>
  );
}`,
    description: 'Reusable structural UI container component with clean borders, light shadow framing, and generic layout parameters.'
  },
  lib: {
    name: 'lib',
    type: 'folder',
    parentId: 'root',
    children: ['lib_db'],
    isExpanded: false,
    description: 'Helper functions, common modules, and core API connection singletons utilized server-side.'
  },
  lib_db: {
    name: 'db.ts',
    type: 'file',
    parentId: 'lib',
    content: `// Simulated local DB clients helper
export const db = {
  getCourses: async () => [
    { id: 'cs-101', title: 'Foundations of Computer Science' },
    { id: 'math-202', title: 'Calculus & Mathematical Modeling' }
  ]
};`,
    description: 'Unified database client initializer pooling queries safely across active web requests.'
  },
  hooks: {
    name: 'hooks',
    type: 'folder',
    parentId: 'root',
    children: ['hooks_progress'],
    isExpanded: false,
    description: 'Custom React state hooks tracking interactive dashboard properties, active states, and browser utilities.'
  },
  hooks_progress: {
    name: 'useProgress.ts',
    type: 'file',
    parentId: 'hooks',
    content: `import { useState } from 'react';

export function useProgress() {
  const [percent, setPercent] = useState(0);
  return { percent, setPercent };
}`,
    description: 'Modular state controller monitoring active learning tracks and updating database values dynamically.'
  },
  public: {
    name: 'public',
    type: 'folder',
    parentId: 'root',
    children: ['public_logo'],
    isExpanded: false,
    description: 'Static public vector images, custom brand decals, and localized font files.'
  },
  public_logo: {
    name: 'logo.svg',
    type: 'file',
    parentId: 'public',
    content: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
</svg>`,
    description: 'Corporate high-contrast student brand logo displayed in site headers and dashboards.'
  },
  package_json: {
    name: 'package.json',
    type: 'file',
    parentId: 'root',
    content: `{
  "name": "edgrow-web",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "14.2.3",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  }
}`,
    description: 'Primary project manifesto specifying local Node modules, package dependencies, and build routines.'
  },
  tsconfig_json: {
    name: 'tsconfig.json',
    type: 'file',
    parentId: 'root',
    content: `{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true
  }
}`,
    description: 'Linter and compiler schema parameters guaranteeing clean type validation inside Next.js pages.'
  },
  next_config: {
    name: 'next.config.js',
    type: 'file',
    parentId: 'root',
    content: `module.exports = {
  reactStrictMode: true,
  output: 'export',
  distDir: 'dist'
};`,
    description: 'Core Next.js server override module configuring static output directories and optimized asset bundling.'
  }
};

export const AI_ADDITIONS = {
  api_group: {
    description: 'Route handler collections mapping backend functions directly to external API engines.'
  },
  api_gemini: {
    description: 'Specific micro-service endpoint managing student syllabus queries and AI suggestions.'
  },
  gemini_route: {
    description: 'Next.js App Router dynamic API route processing POST payloads directly to Google Gemini.',
    content: `import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request: Request) {
  const { question } = await request.json();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: \`Act as a professional computer science and mathematics tutor. Answer the student's question accurately: \${question}\`
  });
  return NextResponse.json({ reply: response.text });
}`
  },
  lib_gemini: {
    description: 'Unified client wrapper handling secure headers and credentials for Google Gen AI connection pools.',
    content: `import { GoogleGenAI } from '@google/genai';

let client: GoogleGenAI | null = null;

export function getGeminiClient() {
  if (!client) {
    client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return client;
}`
  }
};

export const COLLAB_ADDITIONS = {
  app_classroom: {
    description: 'Next.js App route segment bundling student group workspaces and screen shares.'
  },
  classroom_page: {
    description: 'Main study dashboard displaying dynamic directory listing of active classrooms and current topics.',
    content: `'use client';

import React from 'react';

export default function ClassroomsHome() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Collaborative Study Halls</h2>
      <p className="text-slate-500 text-xs mt-1">Select an active class group to enter the workspace.</p>
    </div>
  );
}`
  },
  classroom_id_group: {
    description: 'Dynamic URL routing segment loading individual student rooms by parameter IDs.'
  },
  classroom_id_page: {
    description: 'Full-screen collaborative canvas containing participant lists, dynamic notes, and team chat drawers.',
    content: `'use client';

import React from 'react';
import LiveChat from '@/components/classroom/LiveChat';

export default function ClassroomRoom({ params }: { params: { classId: string } }) {
  return (
    <main className="grid grid-cols-12 gap-6 p-6">
      <div className="col-span-8 bg-white border p-6 rounded-2xl">
        <h3 className="font-bold">Active Lecture Group: {params.classId}</h3>
        <p className="text-xs text-slate-400 mt-1">Collaborative notes synchronized in real-time.</p>
      </div>
      <div className="col-span-4 bg-white border rounded-2xl p-4">
        <LiveChat />
      </div>
    </main>
  );
}`
  },
  components_classroom: {
    description: 'Study components mapping custom group drawers and screen-shares.'
  },
  classroom_chat_file: {
    description: 'Real-time WebSocket or polling chat UI tracking active learner messages and tutor hints.',
    content: `'use client';

import React, { useState } from 'react';

export default function LiveChat() {
  const [messages, setMessages] = useState([{ sender: 'System', text: 'Study hall opened.' }]);
  return (
    <div className="flex flex-col h-60">
      <div className="flex-1 overflow-y-auto text-xs space-y-2">
        {messages.map((m, i) => (
          <p key={i}><strong>{m.sender}:</strong> {m.text}</p>
        ))}
      </div>
    </div>
  );
}`
  }
};
