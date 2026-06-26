/** @type {import('next').NextConfig} */
// BASE_PATH lets the site live under a sub-path (e.g. /alpha) behind a shared
// reverse proxy / Tailscale Funnel. Leave unset for local dev (served at root).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: basePath || undefined,
};
export default nextConfig;
