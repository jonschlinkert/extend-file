'use strict';

/* deps: mocha */
var should = require('should');
var extendFile = require('./');

describe('extendFile', function () {
  it('should extend the given file with properties:', function () {
    var pkg = extendFile('package.json', {foo: 'bar'});
    pkg.should.have.properties(['name', 'version', 'foo']);
  });

  it('should throw an error when invalid args are passed:', function () {
    (function () {
      extendFile();
    }).should.throw('filepath should be a string.');

    (function () {
      extendFile('');
    }).should.throw('filepath should be a string.');

    (function () {
      extendFile('foo', '');
    }).should.throw('second argument should be an object.');
  });
});
