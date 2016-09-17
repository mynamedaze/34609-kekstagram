'use strict';

var utils = require('./utils');

var Gallery = function() {
  this.pictures = [];
  this.activePicture = 0;

  this.galleryOverlay = document.querySelector('.gallery-overlay');
  this.galleryOverlayClose = this.galleryOverlay.querySelector('.gallery-overlay-close');
  this.galleryOverlayImage = this.galleryOverlay.querySelector('.gallery-overlay-image');
  this.likesCount = this.galleryOverlay.querySelector('.likes-count');
  this.commentCount = this.galleryOverlay.querySelector('.comments-count');
};

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
  this.galleryOverlayImage.src = this.pictures[index].url;
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

//Добавляем обработчики событий
Gallery.prototype.addEventsListeners = function() {
  this.galleryOverlayClose.onclick = this.hide.bind(this);
  this.galleryOverlayImage.onclick = this.goToNextPicture.bind(this);
};

//Удаляеем обработчики событий
Gallery.prototype.removeEventsListeners = function() {
  this.galleryOverlayClose.onclick = null;
  this.galleryOverlayImage.onclick = null;
};

//Добавляем обработчик клика на элемент галереи
Gallery.prototype.goToNextPicture = function() {

  var nextIndexPicture = (this.activePicture >= (this.pictures.length - 1)) ? 0 : (this.activePicture + 1);
  this.setActivePicture(nextIndexPicture);
};

module.exports = new Gallery();
