'use strict';

var IMAGE_WIDTH = 182;
var IMAGE_HEIGHT = 182;
var TIMEOUT_IMAGE_LOAD = 10000;
var gallery = require('./gallery');
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
  this.element = createPicture(pictureData);
  this.pictureData = pictureData;
  this.addEventsListeners();
  // Удаляем обработчики событий.
  this.remove = function() {
    this.removeEventsListeners();
  };
};

// Обработчик событий
Picture.prototype.addEventsListeners = function() {
  this.onClick = this.onClick.bind(this);
  // Добавляем на изображение обработчик клика.
  this.element.addEventListener('click', this.onClick);
};

//Удаляем обработчики событий
Picture.prototype.removeEventsListeners = function() {
  this.element.removeEventListener('click', this.onClick);
};

Picture.prototype.onClick = function(event) {

  event.preventDefault();
  gallery.show(this.pictureData.getIndex());
};

module.exports = Picture;
