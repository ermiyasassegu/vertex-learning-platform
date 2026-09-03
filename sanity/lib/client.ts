import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
  stega: {
    studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || 'http://localhost:3333',
  },
})

/**
 * Creates a server client with token authentication for reading private datasets.
 */
export function getServerClient(token?: string) {
  const authToken = token || process.env.SANITY_API_READ_TOKEN
  return client.withConfig({
    token: authToken,
    useCdn: false,
    perspective: 'published',
  })
}
