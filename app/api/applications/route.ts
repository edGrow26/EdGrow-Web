import { createClient } from '@sanity/client';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const MAX_RESUME_SIZE = 5 * 1024 * 1024;

function getServerClient() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
  const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN;

  if (!projectId || !token) return null;

  return createClient({
    projectId,
    dataset,
    token,
    apiVersion: '2026-07-17',
    useCdn: false,
  });
}

export async function POST(request: Request) {
  const client = getServerClient();
  if (!client) {
    return NextResponse.json(
      { success: false, message: 'Sanity application storage is not configured.' },
      { status: 503 },
    );
  }

  try {
    const formData = await request.formData();
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim().toLowerCase();
    const roleId = String(formData.get('roleId') || 'internship').trim();
    const requestedRoleTitle = String(formData.get('roleTitle') || '').trim();
    const coverLetter = String(formData.get('coverLetter') || '').trim();
    const website = String(formData.get('website') || '').trim();
    const resume = formData.get('resume');

    if (website) return NextResponse.json({ success: true });

    if (!name || name.length > 120 || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Enter a valid name and email address.' },
        { status: 400 },
      );
    }

    if (!(resume instanceof File) || resume.size === 0) {
      return NextResponse.json(
        { success: false, message: 'Attach your PDF resume.' },
        { status: 400 },
      );
    }

    const isPdf = resume.type === 'application/pdf' || resume.name.toLowerCase().endsWith('.pdf');
    if (!isPdf || resume.size > MAX_RESUME_SIZE) {
      return NextResponse.json(
        { success: false, message: 'Resume must be a PDF file no larger than 5 MB.' },
        { status: 400 },
      );
    }

    const position = roleId === 'internship'
      ? null
      : await client.fetch<{ _id: string; title: string } | null>(
          '*[_type == "job" && _id == $roleId && status == "active"][0]{_id, title}',
          { roleId },
        );

    if (roleId !== 'internship' && !position) {
      return NextResponse.json(
        { success: false, message: 'The selected position is no longer accepting applications.' },
        { status: 400 },
      );
    }

    const roleTitle = position?.title || requestedRoleTitle || 'Internship Program';
    const resumeAsset = await client.assets.upload(
      'file',
      Buffer.from(await resume.arrayBuffer()),
      { filename: resume.name, contentType: 'application/pdf' },
    );

    try {
      const application = await client.create({
        _type: 'jobApplication',
        name,
        email,
        applicationType: position ? 'position' : 'internship',
        ...(position ? { position: { _type: 'reference', _ref: position._id } } : {}),
        roleTitle,
        coverLetter,
        resume: {
          _type: 'file',
          asset: { _type: 'reference', _ref: resumeAsset._id },
        },
        submittedAt: new Date().toISOString(),
        status: 'new',
      });

      return NextResponse.json({ success: true, applicationId: application._id });
    } catch (error) {
      await client.delete(resumeAsset._id).catch(() => undefined);
      throw error;
    }
  } catch (error) {
    console.error('[Careers API] Failed to store application in Sanity.', error);
    return NextResponse.json(
      { success: false, message: 'Application could not be saved. Please try again.' },
      { status: 500 },
    );
  }
}
