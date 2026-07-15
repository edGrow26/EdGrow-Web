'use client';

import { useEffect } from 'react';

const studioUrl =
  process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || 'http://localhost:3333';

export default function StudioBridgePage() {
  useEffect(() => {
    window.location.replace(studioUrl);
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-bold">Opening Sanity Studio…</h1>
        <p className="mt-3 text-sm text-gray-400">
          Make sure the standalone Studio is running in another terminal.
        </p>
        <a
          href={studioUrl}
          className="mt-6 inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black"
        >
          Open Studio
        </a>
      </div>
    </main>
  );
}
