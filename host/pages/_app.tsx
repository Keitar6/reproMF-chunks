import type { AppProps } from 'next/app';
import { preloadRemote } from '@module-federation/enhanced/runtime';
import '@/styles/globals.css';
import '../modules/config/mf_Init';

export async function getServerSideProps() {
  try {
    await preloadRemote([
      {
        nameOrAlias: 'remote1',
        exposes: ['SomeTextFromRemote1'],
        resourceCategory: 'all',
      },
    ]);
  } catch (error) {}

  return { props: {} };
}

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
