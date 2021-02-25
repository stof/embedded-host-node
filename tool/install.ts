// Copyright 2021 Google Inc. Use of this source code is governed by an
// MIT-style license that can be found in the LICENSE file or at
// https://opensource.org/licenses/MIT.

import {getDartSassEmbedded, getEmbeddedProtocol} from './embedded-binaries';
import packageJson = require('../package.json');

async function main() {
  const outPath = 'dist/lib/src/vendor';
  const release = true;
  await getEmbeddedProtocol(outPath, {
    release,
    version: packageJson['embedded-protocol-version'],
  });
  await getDartSassEmbedded(outPath, {
    release,
    version: packageJson['dart-sass-embedded-version'],
  });
}

main();
