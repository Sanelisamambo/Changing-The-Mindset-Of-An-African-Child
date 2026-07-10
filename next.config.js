/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: false,
    formats: ['image/webp'],
  },
  experimental: {
    optimizeCss: true,
  },
  reactStrictMode: true,
  // Important for Netlify
  output: 'standalone',
};

module.exports = nextConfig;