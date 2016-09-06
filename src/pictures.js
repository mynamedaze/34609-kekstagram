'use strict';


var loadJSONPData = require('./load');
var generatePicture = require('./picture');
var gallery = require('./gallery');
var filtersForm = document.querySelector('.filters');

filtersForm.classList.add('hidden');
loadJSONPData('http://localhost:1506/api/pictures?callback=', function(data) {
  data.forEach(function(picture, index) {
    generatePicture(picture, index);
  });

  gallery.setPictures(data);
  filtersForm.classList.remove('hidden');
});
