'use strict';

var IMAGE_WIDTH = 182;
var IMAGE_HEIGHT = 182;
var TIMEOUT_IMAGE_LOAD = 10000;
var gallery = require('./gallery');
var utils = require('./utils');
var BaseComponent = require('./base-component');
var pictureTemplate = getPictureTemplate();

//Создаем шаблон блока с изображением
function getPictureTemplate() {
  var template = document.getElementById('picture-template');

  if ('content' in template) {
    return template.content.querySelector('.picture');
  } else {
    return template.querySelector('.picture');
  }
}

//Создаем DOM-элемент для указанного изображения
function createPicture(picture) {
  var element = pictureTemplate.cloneNode(true);

  loadPicture(picture.url, function(isLoaded) {
    if (!isLoaded) {
      element.classList.add('picture-load-failure');
      return;
    }

    var img = element.querySelector('img');
    img.src = picture.url;
    img.width = IMAGE_WIDTH;
    img.height = IMAGE_HEIGHT;
    element.querySelector('.picture-comments').textContent = picture.comments;
    element.querySelector('.picture-likes').textContent = picture.likes;
  });

  return element;
}

//Загружаем изображения в фоновом режиме
function loadPicture(url, callback) {
  var timeoutId;
  var image = new Image();

  image.onload = function() {
    clearTimeout(timeoutId);
    callback(true);
  };

  image.onerror = function() {
    clearTimeout(timeoutId);
    callback(false);
  };

  timeoutId = setTimeout(function() {
    image.src = '';
    callback(false);
  }, TIMEOUT_IMAGE_LOAD);

  image.src = url;
}

// Конструктор объектов Picture
function Picture(picture, index) {
  BaseComponent.call(this, createPicture(picture));

  this.data = picture;
  this.data.index = index;
}

utils.inherit(Picture, BaseComponent);

//Назначает обработчик клика по изображению
Picture.prototype.onClick = function(evt) {
  evt.preventDefault();

  gallery.show(this.data.index);
};

module.exports = Picture;
