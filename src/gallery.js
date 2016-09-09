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

Gallery.prototype.setPictures = function(pictures) {
  this.pictures = pictures;
};

//Очищаем список изображений
Gallery.prototype.clear = function() {
  this.pictures = [];
};


Gallery.prototype.show = function(index) {

  var self = this;

  // Карочи вот тут будут обработчики событий. Используем onclick сразуздесь!
  // Кнопачка закрыть "Хэ".
  this.galleryOverlayClose.onclick = function() {
    self.hide();
  };

  // Клик по большой фотАчке в оверлее, следующая фотАчка.
  this.galleryOverlayImage.onclick = function() {
    var nextPicture = (self.activePicture >= (self.pictures.length - 1)) ? 0 : self.activePicture + 1;
    self.setActivePicture(nextPicture);
  };

  utils.show(this.galleryOverlay, true);
  this.setActivePicture(index);
};

Gallery.prototype.hide = function() {
  utils.show(this.galleryOverlay, false);
  //Обнуляем как бабушка учила! null!
  this.galleryOverlayClose.onclick = null;
  this.galleryOverlayImage.onclick = null;
};

Gallery.prototype.setActivePicture = function(index) {
  this.activePicture = +index;
  this.galleryOverlayImage.src = this.pictures[index].url;
  this.likesCount.textContent = this.pictures[index].likes;
  this.commentCount.textContent = this.pictures[index].comments;
};

module.exports = new Gallery();
