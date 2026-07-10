/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // ← This disables Next.js image optimization
  },
  experimental: {
    optimizeCss: true,
  },
  reactStrictMode: true,
  output: 'standalone',
};

module.exports = nextConfig;