# extend-file [![NPM version](https://badge.fury.io/js/extend-file.svg)](http://badge.fury.io/js/extend-file)

> Extend a JSON file with additional properties, API and CLI.

## Install

Install with [npm](https://www.npmjs.com/)

```sh
$ npm i extend-file --save
```

<!-- toc -->

* [Usage](#usage)
* [CLI](#cli)
  - [data](#data)
* [Related projects](#related-projects)
* [Running tests](#running-tests)
* [Contributing](#contributing)
* [Author](#author)
* [License](#license)

_(Table of contents generated by [verb](https://github.com/assemble/verb))_

<!-- tocstop -->

## Usage

```js
var extendFile = require('extend-file');

extendFile('package.json', {foo: 'bar'});
// adds `{foo: "bar"} to package.json
```

## CLI

Pass the file to extend as the first argument.

```sh
$ expand-file package.json [data]
                 ^
```

### data

Specify the data to use for extending the file.

```sh
$ expand-file package.json [data]
                             ^
```

Data may be specified using one of the following flags:

* `-d` or  `--data`: specify a string to expand with [expand-object](https://github.com/jonschlinkert/expand-object)
* `-f` or  `--file`: specify a JSON or YAML file to use for data

**Pass an object**

Use the object expansion syntax supported by [expand-object](https://github.com/jonschlinkert/expand-object):

```sh
$ expand-file package.json -d "a.b.c:foo,bar,baz"
#=> "a":{"b":{"c":["foo","bar","baz"]}}}
```

Any issues related to `--data` expansion should be created on the [expand-object](https://github.com/jonschlinkert/expand-object)repo.

**Specify a JSON or YAML file**

Use the contents of another file to extend the first file.

```sh
$ expand-file package.json -f foo.yml
```

JSON and YAML are supported.

## Related projects

[expand-object](https://github.com/jonschlinkert/expand-object): Expand a string into a JavaScript object using a simple notation. Use the CLI or… [more](https://github.com/jonschlinkert/expand-object)

## Running tests

Install dev dependencies:

```sh
$ npm i -d && npm test
```

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/extend-file/issues/new)

## Author

**Jon Schlinkert**

+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2015 Jon Schlinkert
Released under the MIT license.

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on August 01, 2015._