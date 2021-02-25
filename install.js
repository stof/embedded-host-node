// Copyright 2021 Google Inc. Use of this source code is governed by an
// MIT-style license that can be found in the LICENSE file or at
// https://opensource.org/licenses/MIT.

const fs = require('fs');
const shell = require('shelljs');

shell.config.fatal = true;
if (fs.existsSync('.dev')) return;
shell.exec('node dist/tool/install.js', {silent: true});
