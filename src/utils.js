'use strict';

var utils = {
  show: function(elem, show) {
    if (show === true) {
      return elem.classList.remove('invisible');
    } else {
      return elem.classList.add('invisible');
    }
  },
  throttle: function(func, ms) {

    var isThrottled = false,
      savedArgs,
      savedThis;

    function wrapper() {

      if (isThrottled) { // (2)
        savedArgs = arguments;
        savedThis = this;
        return;
      }

      func.apply(this, arguments); // (1)

      isThrottled = true;

      setTimeout(function() {
        isThrottled = false; // (3)
        if (savedArgs) {
          wrapper.apply(savedThis, savedArgs);
          savedArgs = savedThis = null;
        }
      }, ms);
    }

    return wrapper;
  }
};

module.exports = utils;
