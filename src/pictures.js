'use strict';

// Подгружаю внешние модули
var loadJSONPData = require('./load');
var GeneratePicture = require('./picture');
var gallery = require('./gallery');

var url = 'http://localhost:1506/api/pictures?callback=';
var filtersForm = document.querySelector('.filters');

// Элемент контейнер, куда будем помещать сгенерированные элементы.
var picturesContainer = document.querySelector('.pictures');

//скрываю фильтры на старте
filtersForm.classList.add('hidden');

var renderPicture = function(data) {
  //перебираем изображения и применяею шаблон
  data.forEach(function(picture, index) {
    var imageElement = new GeneratePicture(picture, index);
    picturesContainer.appendChild(imageElement.element);
  });
  //подгружем данные в галерею
  gallery.setPictures(data);

//скрываем фильтры после отрисовки
  filtersForm.classList.remove('hidden');
};

loadJSONPData(url, renderPicture);
