'use strict';

(function () {
  /**
   * Получает случайный элемент массива
   *
   * @param {Array} someArray - массив значений.
   * @return {string} someArray[i] - возвращает случайное значение.
   */
  var getElementFromArray = function (someArray) {
    var i = Math.floor(someArray.length * Math.random());
    return someArray[i];
  };
  window.utils = {
    getElementFromArray: getElementFromArray
  };
})();
