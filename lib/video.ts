/**
 * Video embed helpers.
 *
 * The lesson page plays videos on the site through the provider's own embed.
 * A supported provider (YouTube, Vimeo, Bunny) is turned into an embeddable
 * `src` URL that starts at a given second when one is supplied.
 */

export type VideoProvider = "youtube" | "vimeo" | "bunny" | "unknown";

export interface VideoEmbed {
  provider: VideoProvider;
  /** Embed URL for the provider's iframe, or null when the URL is unsupported. */
  src: string | null;
}

function extractYouTubeId(url: URL): string | null {
  if (url.hostname.includes("youtu.be")) {
    return url.pathname.slice(1) || null;
  }
  if (url.pathname.startsWith("/embed/")) {
    return url.pathname.split("/")[2] || null;
  }
  if (url.pathname.startsWith("/shorts/")) {
    return url.pathname.split("/")[2] || null;
  }
  return url.searchParams.get("v");
}

/**
 * Builds a provider embed URL from a lesson video URL.
 *
 * @param videoUrl - The stored video URL (a watch, share, or embed link).
 * @param startSeconds - Optional second to start playback from.
 */
export function getVideoEmbed(videoUrl?: string, startSeconds?: number): VideoEmbed {
  if (!videoUrl) return { provider: "unknown", src: null };

  const start =
    typeof startSeconds === "number" && Number.isFinite(startSeconds) && startSeconds > 0
      ? Math.floor(startSeconds)
      : 0;

  let url: URL;
  try {
    url = new URL(videoUrl);
  } catch {
    return { provider: "unknown", src: null };
  }

  const host = url.hostname.replace(/^www\./, "");

  if (host.includes("youtube.com") || host.includes("youtu.be")) {
    const id = extractYouTubeId(url);
    if (!id) return { provider: "youtube", src: null };
    const params = new URLSearchParams({ rel: "0", modestbranding: "1" });
    if (start > 0) params.set("start", String(start));
    return { provider: "youtube", src: `https://www.youtube.com/embed/${id}?${params.toString()}` };
  }

  if (host.includes("vimeo.com")) {
    const id = url.pathname.split("/").filter(Boolean).pop();
    if (!id) return { provider: "vimeo", src: null };
    const hash = start > 0 ? `#t=${start}s` : "";
    return { provider: "vimeo", src: `https://player.vimeo.com/video/${id}${hash}` };
  }

  if (host.includes("mediadelivery.net") || host.includes("bunny")) {
    // Bunny stream embeds are already in iframe.mediadelivery.net/embed/<lib>/<id> form.
    const embedUrl = new URL(url.toString());
    if (start > 0) embedUrl.searchParams.set("t", String(start));
    return { provider: "bunny", src: embedUrl.toString() };
  }

  return { provider: "unknown", src: null };
}
