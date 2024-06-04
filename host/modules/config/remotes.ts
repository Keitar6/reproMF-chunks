import { type RemoteWithEntry } from '@module-federation/sdk';

type Location = 'ssr' | 'chunks';
type FileType = 'mf-manifest.json' | 'remoteEntry.js';
type StaticPath = `/_next/static/${Location}/${FileType}`;

export const getRemotes = (
  isServer: boolean = typeof window === 'undefined',
  fileType: FileType = 'remoteEntry.js'
): RemoteWithEntry[] => {
  const location: Location = isServer ? 'ssr' : 'chunks';
  const staticPath: StaticPath = `/_next/static/${location}/${fileType}`;

  return [
    {
      name: 'remote1',
      entry:
        (process.env.NEXT_PUBLIC_REMOTE1_CART_APP_URL ||
          'http://localhost:3001') + staticPath,
    },
  ];
};
