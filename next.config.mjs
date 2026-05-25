/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode
  reactStrictMode: true,

  // Optimize images
  images: {
    formats: ["image/avif", "image/webp"],
  },

  // Performance optimizations
  swcMinify: true,

  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false,
  },

  // ESLint configuration
  eslint: {
    dirs: ["app", "components", "lib"],
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
