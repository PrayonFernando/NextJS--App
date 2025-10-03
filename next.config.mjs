/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "prince2-bucket.s3.eu-west-2.amazonaws.com",
      },
    ],
  },
  experimental: { typedRoutes: true },
};

export default nextConfig;
