'use strict';

//Функция-конструктор создания объекта для работы с данными изображения
function PictureData(data, index) {
  this.data = data;
  this.data.index = index;
}

//Возвращаем порядковый индекс изображения
PictureData.prototype.getIndex = function() {
  return this.data.index;
};

// Возвращаем адрес изображения
PictureData.prototype.getUrl = function() {
  return this.data.url;
};

//Возвращаем количество лайков
PictureData.prototype.getLikesCount = function() {
  return this.data.likes;
};

//Возвращаем количество комментариев
PictureData.prototype.getCommentsCount = function() {
  return this.data.comments;
};

//Увеличиваем количество лайков на один
PictureData.prototype.likesIncrement = function() {
  this.data.likes++;
};

//Увеличиваем количество комментариев на один
PictureData.prototype.commentsIncrement = function() {
  this.data.comments++;
};


module.exports = PictureData;
