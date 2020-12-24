// Copyright 2020 Google Inc. Use of this source code is governed by an
// MIT-style license that can be found in the LICENSE file or at
// https://opensource.org/licenses/MIT.

import yargs from 'yargs';

import {getDartSassEmbedded, getEmbeddedProtocol} from './embedded-binaries';

const argv = yargs(process.argv.slice(2))
  .option('release', {
    type: 'boolean',
    description: 'Download a released version of Embedded Dart Sass',
  })
  .option('embedded-host-version', {
    type: 'string',
    description: 'The version or ref of Embedded Dart Sass to download',
  }).argv;

async function main() {
  const outPath = 'lib/src/vendor';
  await getEmbeddedProtocol(outPath);
  await getDartSassEmbedded(outPath, {
    release: argv.release,
    version: argv['embedded-host-version'],
  });
}

main();
