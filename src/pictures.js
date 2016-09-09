'use strict';

// Подгружаю внешние модули
var load = require('./load');
var GeneratePicture = require('./picture');
var gallery = require('./gallery');
var GAP = 500;
var PICTURES_LOAD_URL = '/api/pictures';
var PICTURES_LIMIT = 12;
var currentPageNumber = 0;
var currentFilterId = 'filter-popular';
var allPicturesIsloaded = false;

var filtersForm = document.querySelector('.filters');

filtersForm.classList.add('hidden');

// Элемент контейнер, куда будем помещать сгенерированные элементы.
var picturesContainer = document.querySelector('.pictures');

var renderPicture = function(pictures) {
  if (!pictures.length) {
    allPicturesIsloaded = true;
    return false;
  }
  //перебираем изображения и применяею шаблон
  pictures.forEach(function(picture, index) {
    var imageElement = new GeneratePicture(picture, index);
    picturesContainer.appendChild(imageElement.element);
  });
  //подгружем данные в галерею
  gallery.setPictures(pictures);

  return true;
};

//Чистим список изображений
function clearPicturesList() {
  currentPageNumber = 0;
  picturesContainer.innerHTML = '';
  allPicturesIsloaded = false;
  gallery.clear();
}

//----------------------

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
  console.log(currentPageNumber);
  console.log(currentFilterId);
}

//добавляем функцию добавления дополнительной партии фоточек для экранов с высоким разрешением
function getMorePicturesList() {
  if (containerPicturesListFilled() || allPicturesIsloaded) {
    return;
  }

  getPicturesList(function(pictures) {
    renderPicture(pictures);
    setTimeout(getMorePicturesList, 50);
  });
}

//добавляем функцию проверки конца страницы экрана
function endOfPage() {
  var footerPosition = document.querySelector('footer').getBoundingClientRect();
  return footerPosition.top - window.innerHeight < GAP;
}

//проверяем, заполнено ли свободное экранное место контейнера
function containerPicturesListFilled() {
  var height = picturesContainer.getBoundingClientRect().height;

  return height > window.innerHeight;
}

// добавляем функцию для обработчика scroll (+кулдаун на прокрутку)
function onWindowScroll() {

  //кулдаун на считывание скролла
  var scrollCoolDown;

  // сам обработчик scroll
  window.addEventListener('scroll', function() {
    if (endOfPage()) {
      clearTimeout(scrollCoolDown);
      scrollCoolDown = setTimeout(function() {
        getPicturesList(renderPicture);
      }, 100);
    }
  });
}

//Добавляет обработчик изменения фильтра
function onFilterChange() {
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

  if (!renderPicture(pictures)) {
    return;
  }

  onFilterChange();
  onWindowScroll();
  getMorePicturesList();
});

filtersForm.classList.remove('hidden');
