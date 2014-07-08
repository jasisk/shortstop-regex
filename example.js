'use strict';
var shortstop = require('shortstop');
var resolver = shortstop.create();
var assert = require('assert');

var shortstopRegex = require('./');

resolver.use('regex', shortstopRegex());

var data = {
    'isSecure': 'regex:^\/secure\/'
};

resolver.resolve(data, function (err, result) {
    assert.equal(result.isSecure.test('/secure/route'), true);
      assert.equal(result.isSecure.test('/notSecure/route'), true);
});

