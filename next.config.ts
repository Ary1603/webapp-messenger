/** @type {import('next').NextConfig} */
const nextConfig: import('next').NextConfig = {
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