'use strict';

var utils = require('./utils');
var BaseComponent = require('./base-component');

var Gallery = function() {
  this.pictures = [];
  this.activePicture = 0;
  this.galleryOverlay = document.querySelector('.gallery-overlay');
  //this.galleryOverlayClose = this.galleryOverlay.querySelector('.gallery-overlay-close');
  this.likesCount = this.galleryOverlay.querySelector('.likes-count');
  this.commentCount = this.galleryOverlay.querySelector('.comments-count');

  BaseComponent.call(this, {'galleryImage': document.querySelector('.gallery-overlay-image'), 'galleryClose': this.galleryOverlay.querySelector('.gallery-overlay-close')});
  this.elements = {'galleryImage': this.goToNextPicture, 'galleryClose': this.hide};
  this.addEventsListeners();
};

utils.inherit(Gallery, BaseComponent);

//Устанавливаем список изображений для просмотра
Gallery.prototype.addPictures = function(pictures) {
  this.pictures = this.pictures.concat(pictures);
};

//Возвращаем количество изображений в галереи
Gallery.prototype.getPicturesCount = function() {
  return this.pictures.length;
};

//Очищаем список изображений
Gallery.prototype.clear = function() {
  this.pictures = [];
};

//Устанавливаем активное изображение
Gallery.prototype.setActivePicture = function(index) {
  if (!this.pictures[index]) {
    return;
  }
  this.activePicture = index;
  this.element.src = this.pictures[index].url;
  this.likesCount.textContent = this.pictures[index].likes;
  this.commentCount.textContent = this.pictures[index].comments;
};

//Отображаем галерею
Gallery.prototype.show = function(index) {
  this.addEventsListeners();

  utils.show(this.galleryOverlay, true);

  this.setActivePicture(index);
};

//Скрываем галерею

Gallery.prototype.hide = function() {
  utils.show(this.galleryOverlay, false);

  this.removeEventsListeners();
};

//Удаляеем обработчики событий
Gallery.prototype.removeEventsListeners = function() {
  this.galleryOverlayClose.onclick = null;
  this.element.onclick = null;
};

//Добавляем обработчик клика на элемент галереи
Gallery.prototype.goToNextPicture = function() {

  var nextIndexPicture = (this.activePicture >= (this.pictures.length - 1)) ? 0 : (this.activePicture + 1);
  this.setActivePicture(nextIndexPicture);
};

module.exports = new Gallery();
