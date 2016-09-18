'use strict';

function BaseComponent(element) {
  this.element = element;

  this.addEventsListeners();
}

//Добавляем элемент в указанную ноду на странице
BaseComponent.prototype.appendTo = function(parent) {
  parent.appendChild(this.element);
};

//Добавляем обработчики событий
BaseComponent.prototype.addEventsListeners = function() {
  this.onClick = this.onClick.bind(this);
  this.element.addEventListener('click', this.onClick);
};

//Удаляем элемент со cтраницы
BaseComponent.prototype.remove = function() {
  this.element.removeEventListener('click', this.onclick);
  this.element.parentNode.removeChild(this.element);
};

//Обработчик клика по компоненту
BaseComponent.prototype.onClick = function() {};


module.exports = BaseComponent;
