/*!
 * extend-file <https://github.com/jonschlinkert/extend-file>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var path = require('path');
var merge = require('mixin-deep');

module.exports = function extendFile(fp, obj) {
  if (typeof fp !== 'string' || !fp.length) {
    throw new TypeError('filepath should be a string.');
  }
  if (typeof obj !== 'object') {
    throw new TypeError('second argument should be an object.');
  }

  try {
    var file = require(path.resolve(fp));
    return merge(file, obj);
  } catch(err) {
    throw err;
  }
};
