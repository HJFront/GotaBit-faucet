/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH,
  perDayTestToken: process.env.PER_DAY_TEST_TOKEN,
  experimental: {
    images: {
      unoptimized: true,
    },
  },
}

module.exports = nextConfig
