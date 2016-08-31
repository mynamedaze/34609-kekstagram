'use strict';

var loadJSONPData = require('./load');
var getPicture = require('./review');

loadJSONPData('http://localhost:1506/api/pictures?callback=', function(data) {
  data.forEach(function(picture) {
    getPicture(picture);
  });
});
