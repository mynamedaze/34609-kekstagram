'use strict';


var gallery = require('./gallery');
var utils = require('./utils');

var clsPicLoadFail = 'picture-load-failure';

var indexPictureDOM = 'indexImage';

function createElement(picture, index) {

  // Переменная куда помещаем нужный элемент из шаблона.
  var sampleElement = utils.checkForTemplate();

  //Лимит на загрузку изображения
  var IMAGE_LOAD_TIMEOUT = 10000;

  // Клонируем элемент шаблона.
  var element = sampleElement.cloneNode(true);

  // Создаем новое изображение c использованием конструктора.
  var imageContent = new Image(182, 182);

  // Обработчик загрузки изображения.
  imageContent.onload = function() {
    clearTimeout(imgLoadTimeout);

    // Заменяем текущий 'img' на новый из конструктора.
    element.replaceChild(imageContent, element.querySelector('img'));
  };

// Обработчик ошибки сервера.
  imageContent.onerror = function() {
    element.classList.add(clsPicLoadFail);
  };

  // Обработчик лимита ответа от сервера.
  var imgLoadTimeout = setTimeout(function() {
    imageContent.src = '';

    element.classList.add(clsPicLoadFail);
  }, IMAGE_LOAD_TIMEOUT);

  //Присвоение изображения
  imageContent.src = picture.url;

  // Нумеруем список изображений.
  element.dataset[indexPictureDOM] = index;

  element.querySelector('.picture-comments').textContent = picture.comments;
  element.querySelector('.picture-likes').textContent = picture.likes;

  return element;
}

// Конструктор объектов Picture
var Picture = function(picture, index) {
  this.picture = picture;
  this.element = createElement(picture, index);

  // Добавляем на изображение обработчик клика.
  this.element.onclick = function(event) {
    event.preventDefault();
    gallery.show(event.target.parentElement.dataset[indexPictureDOM]);
  };

  // Удаляем обработчики событий.
  this.remove = function() {
    this.element.onclick = null;
  };
};

// Экспортируем из модуля конструктор.
module.exports = Picture;
