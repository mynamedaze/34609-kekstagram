'use strict';

var loadJSONPData = require('./load');
var generatePicture = require('./review');
var filtersForm = document.querySelector('.filters');

loadJSONPData('http://localhost:1506/api/pictures?callback=', function(data) {
  data.forEach(function(picture) {
    generatePicture(picture);
  });
  if(filtersForm.classList.contains('hidden')) {
    filtersForm.classList.remove('hidden');
  }
});
