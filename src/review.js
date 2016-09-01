'use strict';

var IMAGE_LOAD_TIMEOUT = 3000;
var templateElement = document.querySelector('template');
var container = document.querySelector('.container');
var clsPictureClass = '.picture';
var clsPicLoadFailClass = 'picture-load-failure';

module.exports = function(picture) {

  var elementToClone;
  var backgroundLoadTimeout;

  if('content' in templateElement) {
    elementToClone = templateElement.content.querySelector(clsPictureClass);
  } else {
    elementToClone = templateElement.querySelector(clsPictureClass);
  }

  var element = elementToClone.cloneNode(true);
  var img = element.querySelector('img');

  backgroundLoadTimeout = setTimeout(function() {
    img.src = '';
    element.classList.add(clsPicLoadFailClass);
  }, IMAGE_LOAD_TIMEOUT);

  img.onload = function() {
    clearTimeout(backgroundLoadTimeout);
  };

  img.onerror = function() {
    element.classList.add(clsPicLoadFailClass);
  };

  img.src = picture.url;
  container.appendChild(element);

  return element;
};
