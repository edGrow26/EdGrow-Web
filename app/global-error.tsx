'use client';

import React from 'react';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  React.useEffect(() => {
    console.error('Captured by global error boundary:', error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-black text-white flex flex-col items-center justify-center min-h-screen p-6 text-center font-sans">
        <div className="max-w-md p-8 rounded-2xl bg-white/[0.02] border border-white/5 shadow-2xl">
          <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center mx-auto mb-6 text-xl">
            ⚠
          </div>
          <h2 className="text-lg font-black tracking-tight text-white mb-2">System Interruption</h2>
          <p className="text-xs text-gray-400 leading-relaxed mb-8">
            An unexpected error occurred during execution. Rest assured, our systems engineers are on the line.
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => reset()}
              className="w-full py-3 bg-accent hover:bg-mint text-black font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Reset Interface State
            </button>
            <button
              onClick={() => window.location.reload()}
              className="w-full py-3 bg-white/5 hover:bg-white/10 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer border border-white/5"
            >
              Force Page Reload
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
