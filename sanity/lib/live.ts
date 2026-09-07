import { defineLive } from 'next-sanity/live'
import { getServerClient } from './client'
import { readToken } from './token'

export const { sanityFetch, SanityLive } = defineLive({
  client: getServerClient(),
  serverToken: readToken,
})
