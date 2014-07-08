'use strict';

module.exports = function (flags) {
  return function (regex) {
    return new RegExp(regex, flags);
  };
};
