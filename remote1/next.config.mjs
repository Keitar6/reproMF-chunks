import { NextFederationPlugin } from '@module-federation/nextjs-mf';

const federationConfig = {
  name: 'remote1',
  filename: 'static/chunks/remoteEntry.js',
  exposes: {
    './SomeTextFromRemote1': './components/SomeTextFromRemote1/index.tsx',
  },
  manifest: true,
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  /**
   * @param {import('webpack').Configuration} config
   * @returns {import('webpack').Configuration}
   */
  webpack(config) {
    config.plugins.push(new NextFederationPlugin(federationConfig));
    config.optimization.minimize = false;

    config.output.publicPath = 'auto';

    return config;
  },

  async headers() {
    return [
      {        
        source: '/_next/static/chunks/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, DELETE, PATCH, POST, PUT, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Authorization, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
