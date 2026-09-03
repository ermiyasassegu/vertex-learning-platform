import { defineCliConfig } from 'sanity/cli'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || '5t2b9v1m'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  typegen: {
    path: '../sanity/lib/**/*.{ts,tsx}',
    schema: 'schema.json',
    generates: '../sanity/types.generated.ts',
  },
})
