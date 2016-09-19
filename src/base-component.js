'use strict';

function BaseComponent(element) {
  this.element = element;
}

//Добавляем элемент в указанную ноду на странице
BaseComponent.prototype.add = function(parent) {
  parent.appendChild(this.element);
};

//Добавляем обработчики событий
BaseComponent.prototype.addEventsListeners = function() {};

//Удаляем элемент со cтраницы
BaseComponent.prototype.remove = function() {
  this.element.parentNode.removeChild(this.element);
};

module.exports = BaseComponent;
