var shortstop = require('shortstop');
var thing = require('core-util-is');
var regex = require('../');
var test = require('tape');

var validMock = {
  'regex': 'regex:^testMe$'
};

var invalidMock = {
  'regex': 'regex:[[['
};

function makeResolver(flags) {
  var resolver = shortstop.create();
  resolver.use('regex', regex(flags));
  return resolver;
};

test('regex', function (t) {
  t.test('should work with a valid regex', function (st) {
    var resolver = makeResolver();
    resolver.resolve(validMock, function (err, result) {
      st.equal(err, null, 'error should be undefined');
      st.ok(thing.isRegExp(result.regex), 'result should be a RegExp');
      st.ok(result.regex.test('testMe'), 'testMe is valid');
      st.notOk(result.regex.test('uhoh'), 'uhoh is invalid');
      st.end();
    });
  });

  t.test('should support flags', function (st) {

    function insensitiveResolve(cb) {
      makeResolver('i').resolve(validMock, function (err, result) {
        st.ok(result.regex.ignoreCase, 'i enables ignoreCase');
        cb();
      });
    }

    function sensitiveResolve(cb) {
      makeResolver().resolve(validMock, function (err, result) {
        st.notOk(result.regex.ignoreCase, 'no i doesn\'t enable ignoreCase');
        cb();
      });
    }

    insensitiveResolve(sensitiveResolve.bind(this, st.end.bind(st)));
  });

  t.test('should not throw with an invalid regex', function (st) {
    var resolver = makeResolver();
    st.doesNotThrow(function () {
      resolver.resolve(invalidMock, function () { st.end(); });
    });
  });

  t.test('should populate err with a invalid regex', function (st) {
    var resolver = makeResolver();
    resolver.resolve(invalidMock, function (err, result) {
      st.equal(err && err.type, 'malformed_regexp', 'error should be a malformed regexp');
      st.equal(result, undefined, 'result should be undefined');
      st.end();
    });
  });
});
