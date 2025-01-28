/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['randomuser.me'], // Allow images from randomuser.me
  },
}

module.exports = nextConfig 