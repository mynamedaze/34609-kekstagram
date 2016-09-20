'use strict';

var IMAGE_WIDTH = 182;
var IMAGE_HEIGHT = 182;
var TIMEOUT_IMAGE_LOAD = 10000;
var gallery = require('./gallery');
var BaseComponent = require('./base-component');
var utils = require('./utils');
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
function createPicture(pictureData) {
  var element = pictureTemplate.cloneNode(true);

  loadPicture(pictureData.getUrl(), function(isLoaded) {
    if (!isLoaded) {
      element.classList.add('picture-load-failure');
      return;
    }

    var img = element.querySelector('img');
    img.src = pictureData.getUrl();
    img.width = IMAGE_WIDTH;
    img.height = IMAGE_HEIGHT;
    element.querySelector('.picture-comments').textContent = pictureData.getCommentsCount();
    element.querySelector('.picture-likes').textContent = pictureData.getLikesCount();
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
var Picture = function(pictureData) {
  BaseComponent.call(this, {'picture': createPicture(pictureData)});
  this.elements = {'picture': gallery.show(this.pictureData.getIndex())};
  this.addEventsListeners();

  this.comments = this.element.querySelector('.picture-comments');
  this.likes = this.element.querySelector('.picture-likes');

  this.pictureData = pictureData;

  this.renderCommentsCount();
  this.renderLikesCount();
};


utils.inherit(Picture, BaseComponent);

//Отрисовываем количество комментариев
Picture.prototype.renderCommentsCount = function() {
  this.comments.textContent = this.pictureData.getCommentsCount();
};

//Отрисовываем количество лайков
Picture.prototype.renderLikesCount = function() {
  this.likes.textContent = this.pictureData.getLikesCount();
};

Picture.prototype.onClick = function(event) {

  event.preventDefault();
};

module.exports = Picture;
