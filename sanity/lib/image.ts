import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url'
import { dataset, projectId } from '../env'

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset })

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source)
}

/**
 * Safely generates an image URL with optional width, height, and auto-format.
 */
export function urlForImage(
  source: SanityImageSource | undefined | null,
  width?: number,
  height?: number
) {
  if (!source) return undefined

  let imageBuilder = builder.image(source).auto('format')

  if (width) {
    imageBuilder = imageBuilder.width(width)
  }
  if (height) {
    imageBuilder = imageBuilder.height(height)
  }

  return imageBuilder.url()
}
