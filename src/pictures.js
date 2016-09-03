'use strict';


var loadJSONPData = require('./load');
var generatePicture = require('./review');
var gallery = require('./gallery');
var filtersForm = document.querySelector('.filters');

filtersForm.classList.add('hidden');
loadJSONPData('http://localhost:1506/api/pictures?callback=', function(data) {
  data.forEach(function(picture) {
    generatePicture(picture);
  });
  filtersForm.classList.remove('hidden');
});
