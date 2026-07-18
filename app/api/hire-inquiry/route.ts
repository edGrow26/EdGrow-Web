import { createClient } from '@sanity/client';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

/** Build a write-capable Sanity client on every request (no module-level singleton). */
function getServerClient() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
  // Prefer a dedicated write token; fall back to the read token (works if it has write permission).
  const token     = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN;

  if (!projectId || !token) return null;

  return createClient({
    projectId,
    dataset,
    token,
    apiVersion: '2026-07-18',
    useCdn: false, // must be false for mutations
  });
}

export async function POST(request: Request) {
  const client = getServerClient();

  if (!client) {
    return NextResponse.json(
      { success: false, message: 'Sanity is not configured on this server.' },
      { status: 503 },
    );
  }

  try {
    const body = await request.json() as {
      name?: unknown;
      email?: unknown;
      subject?: unknown;
      message?: unknown;
    };

    const name    = String(body.name    ?? '').trim();
    const email   = String(body.email   ?? '').trim().toLowerCase();
    const subject = String(body.subject ?? '').trim();
    const message = String(body.message ?? '').trim();

    // ── Basic validation ────────────────────────────────────────────────────────
    if (!name || name.length > 120) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid full name (max 120 characters).' },
        { status: 400 },
      );
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email address.' },
        { status: 400 },
      );
    }

    if (!message || message.length < 10) {
      return NextResponse.json(
        { success: false, message: 'Please provide a project description (at least 10 characters).' },
        { status: 400 },
      );
    }

    // ── Create document in Sanity ───────────────────────────────────────────────
    const doc = await client.create({
      _type: 'hireInquiry',
      name,
      email,
      subject: subject || undefined,
      message,
      status: 'new',
      priority: 'normal',
      submittedAt: new Date().toISOString(),
      source: 'hire-us-form',
    });

    return NextResponse.json({ success: true, inquiryId: doc._id });
  } catch (error) {
    console.error('[Hire Inquiry API] Failed to save inquiry to Sanity:', error);
    return NextResponse.json(
      { success: false, message: 'Your inquiry could not be saved. Please try again or email edgrowproduct@gmail.com.' },
      { status: 500 },
    );
  }
}
