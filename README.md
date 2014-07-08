# shortstop-regex
[![Build Status](https://img.shields.io/travis/jasisk/shortstop-regex.svg?style=flat)](https://travis-ci.org/jasisk/shortstop-regex)

Adds `RegExp` support to [shortstop](https://github.com/krakenjs/shortstop).

## Example
``` js
'use strict';
var shortstop = require('shortstop');
var resolver = shortstop.create();
var assert = require('assert');

var shortstopRegex = require('shortstop-regex');

resolver.use('regex', shortstopRegex());

var data = {
  'isSecure': 'regex:^\/secure\/'
};

resolver.resolve(data, function (err, result) {
  assert.equal(result.isSecure.test('/secure/route'), true);
  assert.equal(result.isSecure.test('/notSecure/route'), false);
});
```
