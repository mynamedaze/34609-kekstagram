'use strict';

var IMAGE_LOAD_TIMEOUT = 3000;
var templateElement = document.querySelector('template');
var container = document.querySelector('.container');
var clsPicture = '.picture';
var clsPicLoadFail = 'picture-load-failure';

module.exports = function(picture) {

  var elementToClone;
  var backgroundLoadTimeout;

  if('content' in templateElement) {
    elementToClone = templateElement.content.querySelector(clsPicture);
  } else {
    elementToClone = templateElement.querySelector(clsPicture);
  }

  var element = elementToClone.cloneNode(true);
  var img = element.querySelector('img');

  backgroundLoadTimeout = setTimeout(function() {
    img.src = '';
    element.classList.add(clsPicLoadFail);
  }, IMAGE_LOAD_TIMEOUT);

  img.onload = function() {
    clearTimeout(backgroundLoadTimeout);
  };

  img.onerror = function() {
    element.classList.add(clsPicLoadFail);
  };

  img.src = picture.url;
  container.appendChild(element);

  return element;
};
