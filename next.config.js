/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    images: {
      unoptimized: true,
    },
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH,
    NEXT_PUBLIC_PER_DAY_TEST_TOKEN: process.env.NEXT_PUBLIC_PER_DAY_TEST_TOKEN,
  }
}

module.exports = nextConfig
