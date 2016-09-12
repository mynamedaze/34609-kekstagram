'use strict';

// Подгружаю внешние модули
var load = require('./load');
var GeneratePicture = require('./picture');
var gallery = require('./gallery');
var PICTURES_LOAD_URL = '/api/pictures';
var PICTURES_LIMIT = 12;
var currentPageNumber = 0;
var currentFilterId = 'filter-popular';
var allPicturesIsloaded = false;

var filtersForm = document.querySelector('.filters');

filtersForm.classList.add('hidden');

// Элемент контейнер, куда будем помещать сгенерированные элементы.
var picturesContainer = document.querySelector('.pictures');

var renderPictures = function(pictures) {
  if (!pictures.length) {
    allPicturesIsloaded = true;
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
  allPicturesIsloaded = false;
  gallery.clear();
}

// Получаем информацию с сервера
function getPicturesList(callback) {
  if (allPicturesIsloaded) {
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
  if (containerPicturesListFilled() || allPicturesIsloaded) {
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

  //кулдаун на считывание скролла
  var scrollCoolDown;

  // сам обработчик scroll
  window.addEventListener('scroll', function() {
    if (containerPicturesListFilled()) {
      clearTimeout(scrollCoolDown);
      scrollCoolDown = setTimeout(function() {
        getPicturesList(renderPictures);
      }, 100);
    }
  });
}

//Добавляет обработчик изменения фильтра
function isFilterChanged() {
  filtersForm.addEventListener('click', function(evt) {
    if (evt.target.tagName !== 'LABEL') {
      return;
    }

    currentFilterId = evt.target.getAttribute('for');

    clearPicturesList();
    getMorePicturesList();
  }, true);
}

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

  filtersForm.classList.remove('hidden');
  isFilterChanged();
  isWindowScrolled();
  getMorePicturesList();
  filtersForm.classList.remove('hidden');
});
