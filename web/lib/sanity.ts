import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: '18r17t61',
  dataset: 'production',
  apiVersion: '2026-09-19',
  useCdn: false,
})
