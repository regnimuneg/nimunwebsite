/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use default server/SSR output so API routes work
  trailingSlash: true,
  images: {
    unoptimized: true,
    qualities: [40, 75, 85],
  },
  // Redirect hidden pages to 404
  async redirects() {
    return [
      {
        source: '/IC7',
        destination: '/404',
        permanent: false,
      },
      {
        source: '/IC7/',
        destination: '/404',
        permanent: false,
      },
      {
        source: '/JNIMUN',
        destination: '/404',
        permanent: false,
      },
      {
        source: '/JNIMUN/',
        destination: '/404',
        permanent: false,
      },
      {
        source: '/Internationals',
        destination: '/404',
        permanent: false,
      },
      {
        source: '/Internationals/',
        destination: '/404',
        permanent: false,
      },
    ];
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }

    config.module.rules.push({
      test: /\.glsl$/,
      use: 'raw-loader',
    });

    return config;
  },
};

module.exports = nextConfig;
