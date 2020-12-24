// Copyright 2020 Google Inc. Use of this source code is governed by an
// MIT-style license that can be found in the LICENSE file or at
// https://opensource.org/licenses/MIT.

import fetch, {Headers, RequestInfo, RequestInit, Response} from 'node-fetch';

/**
 * Like `fetch`, but adds an authorization header on Travis so that we don't run
 * into the GitHub API's public quota limits.
 */
export function githubFetch(
  url: RequestInfo,
  options: RequestInit = {}
): Promise<Response> {
  if (process.env.TRAVIS === 'true' && process.env.GITHUB_AUTH) {
    const headers = new Headers(options.headers);
    headers.set(
      'Authorization',
      'Basic ' +
        Buffer.from(`sassbot:${process.env.GITHUB_AUTH}`).toString('base64')
    );
  }

  return fetch(url, options);
}
