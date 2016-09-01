'use strict';

var IMAGE_LOAD_TIMEOUT = 3000;
var templateElement = document.querySelector('template');
var container = document.querySelector('.container');

module.exports = function(picture) {

  var elementToClone;
  var backgroundLoadTimeout;

  if('content' in templateElement) {
    elementToClone = templateElement.content.querySelector('.picture');
  } else {
    elementToClone = templateElement.querySelector('.picture');
  }

  var element = elementToClone.cloneNode(true);
  var img = element.querySelector('img');

  backgroundLoadTimeout = setTimeout(function() {
    img.src = '';
    element.classList.add('picture-load-failure');
  }, IMAGE_LOAD_TIMEOUT);

  img.onload = function() {
    clearTimeout(backgroundLoadTimeout);
  };

  img.onerror = function() {
    element.classList.add('picture-load-failure');
  };

  img.src = picture.url;
  container.appendChild(element);

  return element;
};
