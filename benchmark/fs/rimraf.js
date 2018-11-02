'use strict';

const common = require('../common');
const path = require('path');
const fs = require('fs');
const tmpdir = require('../../test/common/tmpdir');
const { copyTree } = require('../../test/common/copy-tree');

tmpdir.refresh();

const bench = common.createBenchmark(main, {
  n: [1e3],
  method: ['rmdir', 'rmdirSync']
});

function main({ n, method }) {
  const source = path.join(__dirname, '..', 'napi');
  for (let i = 0; i < n; ++i) {
    copyTree(source, path.join(tmpdir.path, `${i}`));
  }
  bench.start();
  if (method === 'rmdir') {
    (function r(cntr) {
      if (cntr-- <= 0)
        return bench.end(n);
      fs.rmdir(path.join(tmpdir.path, `${cntr}`), { recursive: true },
               (err) => {
                 r(cntr);
               });
    }(n));
  } else {
    (function r(cntr) {
      if (cntr-- <= 0)
        return bench.end(n);
      fs.rmdirSync(path.join(tmpdir.path, `${cntr}`), { recursive: true });
      r(cntr);
    }(n));
  }
}
