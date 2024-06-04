import Document, {
  Head,
  Main,
  Html,
  NextScript,
  type DocumentContext,
  type DocumentInitialProps,
} from 'next/document';

import {
  revalidate,
  FlushedChunks,
  flushChunks,
} from '@module-federation/nextjs-mf/utils';
import {
  init,
  preloadRemote,
  registerRemotes,
} from '@module-federation/enhanced/runtime';
import { getRemotes } from '@/modules/config/remotes';
import runtimePlugin from '@/modules/config/runtimePlugin';

interface CustomDocumentProps extends DocumentInitialProps {
  chunks: string[];
}

export default class CustomDocument extends Document<CustomDocumentProps> {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps & CustomDocumentProps> {
    const intialProps = await Document.getInitialProps(ctx);
    const remotesArray = getRemotes();

    try {
      // console.log('Initializing module federation - start');
      init({
        name: 'host',
        remotes: [],
        plugins: [runtimePlugin()],
      });
      // console.log('Initialized module federation - success');

      // console.log('Registering remote modules - start');

      remotesArray.forEach(({ name, entry }) => {
        registerRemotes(
          [
            {
              name: name,
              alias: name,
              entryGlobalName: name,
              entry: entry,
            },
          ],
          { force: true }
        );
      });

      // console.log('Registering remote modules - success');

      // console.log('Preloading remote modules - start');
      await preloadRemote([
        {
          nameOrAlias: 'remote1',
          exposes: ['SomeTextFromRemote1'],
          resourceCategory: 'all',
        },
      ]);
      // console.log('Preloaded remote modules - success');

      if (
        process.env.NODE_ENV === 'development' &&
        !ctx?.req?.url?.includes('_next')
      ) {
        await revalidate().then((shouldReload) => {
          if (shouldReload) {
            if (ctx.res) {
              ctx.res.writeHead(302, { Location: ctx?.req?.url });
              ctx.res.end();
            }
          }
        });
      } else {
        ctx?.res?.on('finish', () => {
          revalidate();
        });
      }
    } catch (error) {
      console.log(error);
    }

    const chunks = (await flushChunks()) as string[];
    console.log('DOCUMENT - CHUNKS: ', chunks);

    return { ...intialProps, chunks };
  }

  render() {
    return (
      <Html lang="de">
        <Head>
          <div id="FLUSHED_CHUNKS">
            <FlushedChunks chunks={this.props.chunks} />
          </div>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
