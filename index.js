/*!
 * extend-file <https://github.com/jonschlinkert/extend-file>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var fs = require('fs');
var path = require('path');
var read = require('read-data');
var merge = require('mixin-deep');
var set = require('set-value');
var write = require('write');

module.exports = function extendFile(file, data) {
  if (typeof file === 'string') {
    file = {path: file};
  }
  if (typeof file !== 'object') {
    throw new TypeError('first argument should be a file object.');
  }
  if (typeof file.path !== 'string' || !file.path.length) {
    throw new TypeError('filepath should be a string.');
  }
  if (typeof data !== 'object') {
    throw new TypeError('second argument should be an object.');
  }

  file.read = function () {
    file.data = read.data.sync(path.resolve(file.path));
    return file;
  };

  file.extend = function (obj) {
    file.data = file.data || {};
    merge(file.data, data, obj);
    return file;
  };

  file.del = function (key) {
    file.data = file.data || {};
    delete file.data[key];
    return file;
  };

  file.set = function (prop) {
    file.data = file.data || {};
    set(file.data, prop, data);
    return file;
  };

  file.write = function (dest) {
    file.data = file.data || {};
    write.sync(dest || file.path, JSON.stringify(file.data, null, 2));
  };

  if (data && typeof data === 'object') {
    file.read();
    file.extend();
    return file;
  }

  return file;
};
