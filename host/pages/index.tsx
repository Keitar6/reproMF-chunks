import { Inter } from 'next/font/google';
import { loadRemote } from '@module-federation/enhanced/runtime';
import { Suspense, lazy } from 'react';
import SomeTextFromRemote2 from 'remote1/SomeTextFromRemote1';

const SomeTextFromRemote1 = lazy(
  () => loadRemote('remote1/SomeTextFromRemote1') as any
);

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col gap-4 items-center p-24 ${inter.className}`}
    >
      Hello, here is a remote with lazy:
      <Suspense fallback={<h3>...Loading - load remote</h3>}>
        <SomeTextFromRemote1 />
      </Suspense>
      and here is a remote with import:
      <SomeTextFromRemote2 />
    </main>
  );
}
