#!/usr/bin/env node

process.title = 'extend-file';

var fs = require('fs');
var path = require('path');
var expand = require('expand-object');
var store = require('data-store');
var pick = require('object.pick');
var read = require('read-data');
var green = require('ansi-green');
var success = green(require('success-symbol'));
var extendFile = require('./');

var minimist = require('minimist');
var cli = require('minimist-events')(minimist);

var data = {};
var dataKey;
var setKey;
var file;

cli.on(0, function (fp) {
  file = {path: fp};
});

cli.on('file', function (fp) {
  data = tryRead(fp) || {};
});

cli.on('data', function (obj) {
  data = expand(obj);
});

cli.on(1, function (obj) {
  data = expand(obj);
});

cli.on('get', function (key) {
  dataKey = /[\W.]/.test(key)
    ? expand(key)
    : key;
});

cli.on('set', function (key) {
  setKey = key;
});

cli.on('end', function () {
  if (dataKey) data = pick(data, dataKey);
  file = extendFile(file, data);
  if (!file.data) {
    file.read();
  }
  if (setKey) {
    file.set(setKey);
  } else {
    file.extend();
  }
  file.write();
  cli.emit('write', file, data);
});

cli.on('write', function (file, data) {
  console.log();
  var rel = path.relative(process.cwd(), file.path);
  console.log(success, 'updated', green(rel), 'with\n', format(data));
});

cli.parse(process.argv.slice(2), {
  alias: {set: 's', get: 'g', file: 'f', data: 'd'}
});

function tryRead(fp) {
  try {
    return read.data.sync(path.resolve(fp));
  } catch(err) {}
  return null;
}

function format(data) {
  var str = JSON.stringify(data, null, 2);
  return str.split('\n').map(function(line) {
    return '  ' + line;
  }).join('\n');
}
