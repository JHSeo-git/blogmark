/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-f32feec30d8e4eee8750681495853339.r2.dev',
      },
      {
        protocol: 'https',
        hostname: 'files-blogmark.seonest.net',
      },
    ],
  },

  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
