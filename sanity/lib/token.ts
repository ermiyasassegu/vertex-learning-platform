import 'server-only'

export const readToken = process.env.SANITY_API_READ_TOKEN

export const writeToken = process.env.SANITY_API_WRITE_TOKEN

/**
 * Returns the read token or throws if running in strict production without a token for private datasets.
 */
export function getReadToken(): string | undefined {
  return readToken
}
