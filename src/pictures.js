'use strict';


var loadJSONPData = require('./load');
var generatePicture = require('./review');
var filtersForm = document.querySelector('.filters');

loadJSONPData('http://localhost:1506/api/pictures?callback=', function(data) {
  data.forEach(function(picture) {
    generatePicture(picture);
  });
    filtersForm.classList.remove('hidden');
});
