/* eslint-disable node-core/required-modules */

'use strict';

const path = require('path');
const fs = require('fs');

/**
 * Copies a directory wholesale into another directory (recursively).
 * Will throw max call stack exceptions if your tree is too deep.
 * Kind of like `cp -r` but more dumber.
 * @param {string} source - Path to some directory to copy
 * @param {string} dest - Path to destination
 */
function copyTree(source, dest) {
  if (fs.lstatSync(source).isDirectory()) {
    const currentDest = path.join(dest, path.basename(source));
    fs.mkdirSync(currentDest, { recursive: true });
    fs.readdirSync(source, { withFileTypes: true }).forEach((entry) => {
      const currentSource = path.join(source, entry.name);
      if (entry.isDirectory()) {
        copyTree(currentSource, currentDest);
      } else {
        fs.copyFileSync(currentSource, path.join(currentDest, entry.name));
      }
    });
  } else {
    fs.copyFileSync(source, dest);
  }
}

exports.copyTree = copyTree;
