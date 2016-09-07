'use strict';

var utils = {
  show: function(elem, show) {
    if (show === true) {
      return elem.classList.remove('invisible');
    } else {
      return elem.classList.add('invisible');
    }
  },
  checkForTemplate: function() {
    var templateElement = document.querySelector('#picture-template');
    var elementContent;
    if ('content' in templateElement) {
      elementContent = templateElement.content.querySelector('.picture');
    }else {
      elementContent = templateElement.querySelector('.picture');
    }

    return elementContent;
  }
};

module.exports = utils;
