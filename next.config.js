/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  distDir: 'dist',

  eslint: {
    ignoreDuringBuilds: true
  },

  reactStrictMode: true,
  productionBrowserSourceMaps: false
}

module.exports = nextConfig
