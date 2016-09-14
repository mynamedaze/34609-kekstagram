'use strict';

var utils = {
  show: function(elem, show) {
    if (show === true) {
      return elem.classList.remove('invisible');
    } else {
      return elem.classList.add('invisible');
    }
  },
  throttle: function throttle(fn, time) {

    var startTime = new Date();

    return function() {
      var coolDownTime = new Date();

      if (coolDownTime - startTime >= time) {
        fn();
        startTime = new Date();
      }
    };
  }
};

module.exports = utils;
