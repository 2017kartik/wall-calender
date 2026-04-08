/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // Add this if you decide to use the Picsum alternatives below
      {
        protocol: "https",
        hostname: "picsum.photos",
      }
    ],
  },
};

export default nextConfig;