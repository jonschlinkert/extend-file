#!/usr/bin/env node

process.title = 'extend-file';

var fs = require('fs');
var path = require('path');
var expand = require('expand-object');
var argv = require('minimist')(process.argv.slice(2));
var read = require('read-data');
var write = require('write');
var extend = require('./');

var arr = argv._;
var keys = Object.keys(argv);

function tryRead(fp) {
  try {
    return read.data.sync(path.resolve(fp));
  } catch(err) {}
  return null;
}

var data = argv.d || argv.data;
var file = argv._[0];

var obj = {};
if (data) {
  obj = expand(data);
} else {
  obj = tryRead(argv.f || argv.file) || {};
}

var res = extend(file, obj);
write.sync(file, JSON.stringify(res, null, 2));
