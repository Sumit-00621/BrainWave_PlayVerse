/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        // RAWG API game cover images
        protocol: "https",
        hostname: "media.rawg.io",
      },
      {
        // Unsplash placeholder images
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;

