import { type FederationRuntimePlugin } from '@module-federation/enhanced/runtime';

const runtimePlugin: () => FederationRuntimePlugin = function () {
  return {
    name: 'host-runtime-plugin',

    async beforePreloadRemote(args) {
      const { options, preloadOps } = args;

      preloadOps.forEach(({ nameOrAlias }) => {
        const remote = (options.remotes.find((r) => r.name === nameOrAlias) ||
          options.remotes[0]) as (typeof options.remotes)[0] & {
          entry: string;
        };

        const mfManifestEntry = remote.entry.replace(
          'remoteEntry.js',
          'mf-manifest.json'
        );
        remote.entry = mfManifestEntry;
      });
    },
  };
};

export default runtimePlugin;
