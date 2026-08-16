/** @type {import('next').NextConfig} */
const prod = process.env.PROD === "True" || process.env.VERCEL === "1";

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
    PROD: prod ? "True" : "false",
    BUCKET_URL: prod ? "/site-data" : "https://storage.googleapis.com/site_dev_v1",
  },
  async rewrites() {
    return [
      {
        source: "/site-data/:path*",
        destination: "https://storage.googleapis.com/site_v1/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
