import 'server-only';
import { createClient } from '@sanity/client';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || 'production';
const token = process.env.SANITY_API_READ_TOKEN === 'your-read-token' ? undefined : process.env.SANITY_API_READ_TOKEN;

export const isSanityConfigured = Boolean(
  projectId && projectId !== 'your-project-id' && dataset,
);

export const sanityClient = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2026-07-15',
      useCdn: true,
      perspective: 'published',
      token,
    })
  : null;
