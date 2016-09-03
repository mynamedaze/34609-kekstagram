'use strict';
var Gallery = function() {
  this.pictures = [];
  this.activePicture = 0;
  this.galleryOverlay = document.querySelector('.gallery-overlay');
  this.galleryClose = this.galleryOverlay.querySelector('.gallery-overlay-close');
  this.galleryImage = this.galleryOverlay.querySelector('.gallery-overlay-image');
  this.likesCount = this.galleryOverlay.querySelector('.likes-count');
  this.commentCount = this.galleryOverlay.querySelector('.comments-count');
};

Gallery.prototype.setPictures = function(pictures) {
  this.pictures = pictures;
};

Gallery.prototype.show = function(index) {
  this.getCloseClickHandler();
  this.getNextPicture();
  this.galleryOverlay.classList.remove('invisible');
  this.setActivePicture(index);
};

Gallery.prototype.hide = function() {
  this.galleryOverlay.classList.add('invisible');
  this.galleryClose.onclick = null;
  this.galleryImage.onclick = null;
};

Gallery.prototype.setActivePicture = function(index) {
  this.activePicture = index;
  this.galleryImage.src = this.pictures[index].url;
  this.likesCount.textContent = this.pictures[index].likes;
  this.commentCount.textContent = this.pictures[index].comments;
};

Gallery.prototype.getCloseClickHandler = function() {
  var self = this;
  this.galleryClose.onclick = function() {
    self.hide();
  };
};

Gallery.prototype.getNextPicture = function() {
  var self = this;
  this.galleryImage.onclick = function() {
    var nextPicture = (self.activePicture >= (self.pictures.length - 1)) ? 0 : self.activePicture + 1;
    self.setActivePicture(nextPicture);
  };
};

module.exports = new Gallery();
