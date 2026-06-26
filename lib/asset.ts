// Prefix a public-asset path with the configured basePath.
// Raw <img src> / CSS urls aren't auto-prefixed by Next's basePath the way
// next/image and _next chunks are, so route them through here.
const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function asset(path: string): string {
  return `${BASE}${path}`;
}
