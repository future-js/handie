#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */

const [command, ...params] = process.argv.slice(2);

try {
  require(`./${command}`).execute(...params);
} catch (err) {
  console.log('[ERROR]', err);
}
