import { NextFederationPlugin } from '@module-federation/nextjs-mf';

const remotes = (isServer) => {
  const location = isServer ? 'ssr' : 'chunks';
  const staticPath = `/_next/static/${location}/remoteEntry.js`;

  const remoteModules = {
    remote1: `remote1@${
      process.env.NEXT_PUBLIC_REMOTE1_CART_APP_URL || 'http://localhost:3001'
    }${staticPath}`,availabilityCheckUI: `availabilityCheckUI@${
      process.env.NEXT_AVAILABILITY_CHECK_APP_URL || 'http://localhost:3003'
    }${staticPath}`,
  };

  return remoteModules;
};
const federationConfig = (isServer) => ({
  name: 'host',
  filename: 'static/chunks/remoteEntry.js',
  remotes: remotes(isServer),
  extraOptions: {
    debug: true,
    enableUrlLoaderFix: true,
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  /**
   * @param {import('webpack').Configuration} config
   * @returns {import('webpack').Configuration}
   */

  webpack(config, { isServer }) {
    config.plugins.push(new NextFederationPlugin(federationConfig(isServer)));
    config.output.publicPath = 'auto';

    return config;
  },
};

export default nextConfig;
