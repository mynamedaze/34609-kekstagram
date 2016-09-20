'use strict';

function BaseComponent(elements) {
  this._elements = elements;
  this.elements = {};
  this._pKeys = Object.keys(this.elements);
}

//Добавляем элемент в указанную ноду на странице
BaseComponent.prototype.appendTo = function(parent) {
  parent.appendChild(this.elements);
  this.addEventsListeners();
};


//Удаляем элемент со cтраницы
BaseComponent.prototype.remove = function() {
  this.elements.removeEventListener('click', this.onClick);
  this.elements.parentNode.removeChild(this.elements);
};

//Добавляем обработчики событий
BaseComponent.prototype.addEventsListeners = function() {
  this._pKeys.forEach(function(key) {
    var currentOnClick = this.elements[key];
    if ( typeof (currentOnClick.onClick) === 'function' ) {
      currentOnClick.onClick = currentOnClick.onClick.bind(this);
      this._elements[key].addEventListener('click', currentOnClick.onClick);
    }
  });
};

//Обработчик клика по компоненту
BaseComponent.prototype.onClick = function() {};


module.exports = BaseComponent;
