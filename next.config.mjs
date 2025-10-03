/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "prince2-bucket.s3.eu-west-2.amazonaws.com",
      },
      // If tag icons or images may come from other hosts, add them here:
      // { protocol: "https", hostname: "*.s3.amazonaws.com" },
      // { protocol: "https", hostname: "*.amazonaws.com" },
    ],
  },
  experimental: { typedRoutes: true },
};

export default nextConfig;
