/** @type {import('next').NextConfig} */
const nextConfig: import('next').NextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
    ],
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js', // o '*.tsx' si prefieres TSX
      },
    },
  },
};

module.exports = nextConfig;