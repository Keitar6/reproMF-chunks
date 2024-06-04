import { init, registerRemotes } from '@module-federation/enhanced/runtime';
import runtimePlugin from './runtimePlugin';
import { getRemotes } from './remotes';

// Initialization
init({
  name: 'host',
  remotes: [],
  plugins: [runtimePlugin()],
});

getRemotes().forEach(({ name, entry }) => {
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
