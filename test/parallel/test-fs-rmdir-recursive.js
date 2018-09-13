'use strict';

const common = require('../common');
const assert = require('assert');
const path = require('path');
const fs = require('fs');
const tmpdir = require('../common/tmpdir');
const basedirpath = path.join(tmpdir.path, 'dir');
const subdirpath = path.join(basedirpath, 'subdir');

tmpdir.refresh();

// Make sure the directory does not exist
assert(!fs.existsSync(basedirpath));
// Create the directory now
fs.mkdirSync(subdirpath, { recursive: true });
// Make sure the directory exists
assert(fs.existsSync(subdirpath));
// remove the base
fs.rmdirSync(basedirpath, { recursive: true });
// Make sure the directory does not exist
assert(!fs.existsSync(basedirpath));

// Similarly test the Async version
fs.mkdir(subdirpath, { recursive: true },
         common.mustCall(function(err) {
           assert.ifError(err);
           assert.strictEqual(this, undefined);
           fs.rmdir(basedirpath, { recursive: true },
                    assert.ifError);
         }));
