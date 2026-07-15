import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';

const projectId = import.meta.env.SANITY_STUDIO_PROJECT_ID;
const dataset = import.meta.env.SANITY_STUDIO_DATASET || 'production';

if (!projectId || projectId === 'your-project-id') {
  throw new Error(
    'Set SANITY_STUDIO_PROJECT_ID in the root .env.local file before starting Sanity Studio.',
  );
}

export default defineConfig({
  name: 'default',
  title: 'Edgrow Content Studio',
  projectId,
  dataset,
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
