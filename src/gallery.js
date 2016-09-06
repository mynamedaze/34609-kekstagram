'use strict';

var utils = require('./utils');

var Gallery = function() {
  this.pictures = [];
  this.activePicture = null;
  this.galleryOverlay = document.querySelector('.gallery-overlay');
  this.galleryOverlayClose = this.galleryOverlay.querySelector('.gallery-overlay-close');
  this.galleryOverlayImage = this.galleryOverlay.querySelector('.gallery-overlay-image');
  this.likesCount = this.galleryOverlay.querySelector('.likes-count');
  this.commentCount = this.galleryOverlay.querySelector('.comments-count');
};

Gallery.prototype.setPictures = function(pictures) {
  this.pictures = pictures;
};

Gallery.prototype.show = function(index) {
  utils.show(this.galleryOverlay, true);
  this.setActivePicture(index);
  this.addEventHandler();
};

Gallery.prototype.hide = function() {
  utils.show(this.galleryOverlay, false);
  this.removeEventHandler();
};

Gallery.prototype.setActivePicture = function(index) {
  this.activePicture = index;
  this.galleryOverlayImage.src = this.pictures[index].url;
  this.likesCount.textContent = this.pictures[index].likes;
  this.commentCount.textContent = this.pictures[index].comments;
};

Gallery.prototype.setNextPicture = function() {
  var self = this;
  this.galleryOverlayImage.onclick = function() {
    var nextPicture = (self.activePicture >= (self.pictures.length - 1)) ? 0 : self.activePicture + 1;
    self.setActivePicture(nextPicture);
  };
};

Gallery.prototype.closeGallery = function() {
  event.preventDefault();
  this.hide();
};

Gallery.prototype.addEventHandler = function() {
  this.closeGallery = this.closeGallery.bind(this);
  this.setNextPicture = this.setNextPicture.bind(this);
  this.galleryOverlayClose.addEventListener('click', this.closeGallery);
  this.galleryOverlayImage.addEventListener('click', this.setNextPicture);
};

Gallery.prototype.removeEventHandler = function() {
  this.galleryOverlayClose.removeEventListener('click', this.closeGallery);
  this.galleryOverlayImage.removeEventListener('click', this.setNextPicture);
};

module.exports = new Gallery();
