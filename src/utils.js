'use strict';

var utils = {
  show: function(elem, show) {
    if (show === true) {
      return elem.classList.remove('invisible');
    } else {
      return elem.classList.add('invisible');
    }
  }
};

module.exports = utils;
