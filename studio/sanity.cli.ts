import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  studioHost: 'edgrow-admin',
  deployment: {
    appId: 'w6lkd2h9idoo8e9ubtkuouz5',
  },
});


