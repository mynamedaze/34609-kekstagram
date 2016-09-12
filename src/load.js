'use strict';

module.exports = function(url, params, callback) {

  var xhr = new XMLHttpRequest();
  xhr.open('GET', url + '?from=' + params.from + '&to=' + params.to + '&filter=' + params.filter, true);

  xhr.onload = function(evt) {
    try {
      var loadedData = JSON.parse(evt.target.response);
      callback(loadedData);
    } catch (err) {
      console.warn('JSON parse error!');
    }
  };

  xhr.onerror = function() {
    console.error('Data has not been loaded');
  };

  xhr.timeout = 10000;
  xhr.ontimeout = function() {
    console.warn('Response from the server was not received');
  };

  xhr.send();
};
