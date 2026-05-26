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
    const isProd = process.env.NODE_ENV === 'production';
    const rules = [
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

    // if (isProd) {
    // TODO: DO NOT COMMIT - uncomment this redirect rule before pushing to prod
    //   rules.push({
    //     source: '/JNIMUN/:path*',
    //     destination: '/404',
    //     permanent: false,
    //   });
    // }

    return rules;
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
