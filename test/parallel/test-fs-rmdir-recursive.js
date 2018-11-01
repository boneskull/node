'use strict';

const common = require('../common');
const assert = require('assert');
const path = require('path');
const fs = require('fs');
const tmpdir = require('../common/tmpdir');
const basedirpath = path.join(tmpdir.path, 'dir');
const subdirpath = path.join(basedirpath, 'subdir');
const filepath = path.join(subdirpath, 'foo.txt');

function createTree() {
  // Create the directory and file hierarchy
  fs.mkdirSync(subdirpath, { recursive: true });
  fs.writeFileSync(filepath, 'bar\n');
  // Make sure the file exists
  assert(fs.existsSync(filepath));
}

tmpdir.refresh();
// sanity check
assert(!fs.existsSync(basedirpath));
createTree();

// remove the base
fs.rmdirSync(basedirpath, { recursive: true });
// ensure nothing exists
assert(!fs.existsSync(filepath));
assert(!fs.existsSync(subdirpath));
assert(!fs.existsSync(basedirpath));

// Similarly test the Async version
createTree();
fs.rmdir(basedirpath, { recursive: true }, common.mustCall((err) => {
  assert.ifError(err);
  assert(!fs.existsSync(filepath));
  assert(!fs.existsSync(subdirpath));
  assert(!fs.existsSync(basedirpath));
}));
