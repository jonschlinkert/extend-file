'use strict';

/* deps: mocha */
var should = require('should');
var extend = require('./');

describe('extend', function () {
  it('should extend the given file with properties:', function () {
    var file = extend('package.json', {foo: 'bar'});
    file.data.should.have.properties(['name', 'version', 'foo']);
  });

  it('should extend the given file with properties:', function () {
    var file = extend('package.json', {foo: 'bar'});
    file.read();
    file.extend();
    file.data.should.have.properties(['name', 'version', 'foo']);
    file.data.should.not.have.property('one');
    file.extend({one: 'two'});
    file.data.should.have.property('one');
    file.data.should.not.have.property('yyy');
    file.extend({yyy: 'zzz'});
    file.data.should.have.property('yyy');
  });

  it('should throw an error when invalid args are passed:', function () {
    (function () {
      extend('');
    }).should.throw('filepath should be a string.');

    (function () {
      extend('foo', '');
    }).should.throw('second argument should be an object.');
  });
});
