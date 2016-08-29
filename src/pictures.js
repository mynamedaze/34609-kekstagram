'use strict';

var createCallback = function(url, callback) {
  var scriptEl = document.createElement('script');
  scriptEl.src = url + 'JSONPCallback';
  document.body.appendChild(scriptEl);

  window.JSONPCallback = function(data) {
    callback(data);
  };
};

createCallback('http://localhost:1506/api/pictures?callback=', function(data) {
  data.forEach(function(picture) {
    getPicture(picture);
    showFilters();
  });
});

var getTemplate = function() {
  var templateElement = document.querySelector('template');
  var elementToClone;

  if('content' in templateElement) {
    elementToClone = templateElement.content.querySelector('.picture');
  } else {
    elementToClone = templateElement.querySelector('.picture');
  }
  return elementToClone.cloneNode(true);
};

var getPicture = function(picture) {
  var element = getTemplate();

  var img = element.querySelector('img');
  var backgroundLoadTimeout;
  var IMAGE_LOAD_TIMEOUT = 3000;

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

  var container = document.querySelector('.container');
  img.src = picture.url;
  container.appendChild(element);

  return element;
};

var showFilters = function() {
  var filtersForm = document.querySelector('.filters');

  if(filtersForm.classList.contains('hidden')) {
    filtersForm.classList.remove('hidden');
  }
};
