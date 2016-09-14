'use strict';

// Подгружаю внешние модули
var load = require('./load');
var utils = require('./utils');
var GeneratePicture = require('./picture');
var gallery = require('./gallery');
var PICTURES_LOAD_URL = '/api/pictures';
var PICTURES_LIMIT = 12;
var currentPageNumber = 0;
var currentFilterId = 'filter-popular';
var picturesIsNoLeft = false;

var filtersForm = document.querySelector('.filters');

filtersForm.classList.add('hidden');

// Элемент контейнер, куда будем помещать сгенерированные элементы.
var picturesContainer = document.querySelector('.pictures');

var renderPictures = function(pictures) {
  if (!pictures.length) {
    picturesIsNoLeft = true;
    return false;
  }

  var nextIndexPicture = gallery.getPicturesCount();

  //перебираем изображения и применяю шаблон
  pictures.forEach(function(picture) {
    var imageElement = new GeneratePicture(picture, nextIndexPicture);
    picturesContainer.appendChild(imageElement.element);
    nextIndexPicture++;
  });

  //подгружем данные в галерею
  gallery.addPictures(pictures);

  return true;
};

//Чистим список изображений
function clearPicturesList() {
  currentPageNumber = 0;
  picturesContainer.innerHTML = '';
  picturesIsNoLeft = false;
  gallery.clear();
}

// Получаем информацию с сервера
function getPicturesList(callback) {
  if (picturesIsNoLeft) {
    return;
  }

  var from = PICTURES_LIMIT * currentPageNumber;
  var to = from + PICTURES_LIMIT;

  load(PICTURES_LOAD_URL, {
    from: from,
    to: to,
    filter: currentFilterId
  }, callback);
  currentPageNumber++;
}

//добавляем функцию добавления дополнительной партии фоточек для экранов с высоким разрешением
function getMorePicturesList() {
  if (containerPicturesListFilled() || picturesIsNoLeft) {
    filtersForm.classList.remove('hidden');
    return;
  }
  getPicturesList(function(pictures) {
    renderPictures(pictures);
    getMorePicturesList();
  });
}

//проверяем, заполнено ли свободное экранное место контейнера
function containerPicturesListFilled() {
  var height = picturesContainer.getBoundingClientRect().height;

  return height > document.documentElement.clientHeight;
}

// добавляем функцию для обработчика scroll (+кулдаун на прокрутку)
function isWindowScrolled() {

  //описываем догрузку фотографий при скролле
  var optimizedScroll = utils.throttle(function() {
      if (containerPicturesListFilled()) {
        getPicturesList(renderPictures);
      }
  }, 1000);

  // сам обработчик scroll
  window.addEventListener('scroll', optimizedScroll);
}

//Добавляет обработчик изменения фильтра
var filterChange = function(evt) {
  if (evt.target.tagName !== 'LABEL') {
    return;
  }

  currentFilterId = evt.target.getAttribute('for');

  clearPicturesList();
  getMorePicturesList();
};

/**
  *иии теперь запускаем всё:
  * -первая партия фоток
  * -применение фильтра
  * -догрузка фоток при скролле до низа
  * -догрузка фоток в незаполненную область
  */

getPicturesList(function(pictures) {
  if (!renderPictures(pictures)) {
    return;
  }
  if (pictures.length) {
    filtersForm.addEventListener('click', filterChange, true);
    getMorePicturesList();
    isWindowScrolled();
  }

});
