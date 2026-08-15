/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    unoptimized: true,
    domains: [
      // imgur
      "i.imgur.com",
      // instagram, through TBA
      "www.thebluealliance.com",
    ],
  },
  env: {
    PROD: process.env.PROD || "false",
  },
};

module.exports = nextConfig;
