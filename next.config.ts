import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true // disables ESLint errors from blocking builds
  },
  typescript: {
    ignoreBuildErrors: true // ⚠️ turns off type checking at build time
  }
}

export default nextConfig
