'use strict';

var utils = {
  show: function(elem, show) {
    if (show === true) {
      return elem.remove('invisible');
    } else {
      return elem.add('invisible');
    }
  }
};

module.exports = utils;
