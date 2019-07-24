'use strict';

(function () {
  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError();
      }
    });
    xhr.addEventListener('error', function () {
      onError();
    });
    xhr.addEventListener('timeout', function () {
      onError();
    });
    xhr.timeout = 10000;
    xhr.open('GET', 'https://js.dump.academy/code-and-magick/data');
    xhr.send();
  };

  var save = function (onLoad, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad();
      } else {
        onError();
      }
    });
    xhr.addEventListener('error', function () {
      onError();
    });
    xhr.addEventListener('timeout', function () {
      onError();
      xhr.send(data);
    });
  };

  window.backend = {
    loadData: load,
    saveData: save
  };
})();
