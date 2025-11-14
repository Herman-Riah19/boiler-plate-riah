
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/ui"],
  env: {
    API_URL: process.env.API_URL
  }
};

export default nextConfig;
