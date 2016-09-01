'use strict';

module.exports = function(url, callback) {
  var scriptEl = document.createElement('script');
  scriptEl.src = url + 'JSONPCallback';
  document.body.appendChild(scriptEl);

  window.JSONPCallback = function(data) {
    callback(data);
  };
};
