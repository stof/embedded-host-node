// Copyright 2020 Google Inc. Use of this source code is governed by an
// MIT-style license that can be found in the LICENSE file or at
// https://opensource.org/licenses/MIT.

import yargs from 'yargs';

import {getDartSassEmbedded, getEmbeddedProtocol} from './embedded-binaries';
import {githubFetch} from './github-fetch';

const argv = yargs(process.argv.slice(2)).option('release', {
  type: 'boolean',
  description: 'Download a released version of Embedded Dart Sass',
}).argv;

async function main() {
  const outPath = 'lib/src/vendor';
  await getEmbeddedProtocol(outPath);
  await getDartSassEmbedded(outPath, {
    release: argv.release,
    version: argv.release ? undefined : await getEmbeddedHostRef(),
  });
}

/**
 * If this is a Travis pull request that references a Dart Sass Embedded pull
 * request, returns the Git ref of that pull request to test this one against.
 */
async function getEmbeddedHostRef(): Promise<string | undefined> {
  const pullRequest = process.env.TRAVIS_PULL_REQUEST;
  if (!pullRequest || pullRequest === 'false') return undefined;

  const response = await githubFetch(
    'https://api.github.com/repos/sass/dart-sass-embedded/pulls/${pullRequest}'
  );
  if (!response.ok) throw Error(response.statusText);

  const payload = JSON.parse(await response.text());
  const match = payload.body.match(/sass\/sass-spec(#|\/pull\/)([0-9]+)/);
  if (!match) return undefined;
  return `pull/${match[2]}/head`;
}

main();
