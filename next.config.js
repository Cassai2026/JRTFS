/** @type {import('next').NextConfig} */
const nextConfig = {
  // Production hardening
  poweredByHeader: false,
  // Image optimization (local images only; add remote domains as needed)
  images: {
    remotePatterns: [],
  },
};

module.exports = nextConfig;
