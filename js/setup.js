'use strict';

(function () {

  var utils = window.utils;
  var backend = window.backend;
  var NUMBER_OF_PLAYERS = 4;
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');

  var onLoad = function (loadedData) {
    var updatedWizards = updateWizards(loadedData);
    renderWizards(updatedWizards);

  };
  var onError = function () {
  };
  backend.loadData(onLoad, onError);

  /**
   * Генерирует новый обект на основе клона шаблона волшебника
   *
   * @param {Object} wizard - объект с данными волшебника.
   * @return {Object} uniqeWizard - возвращает клон шаблона с измененными свойствами: имя, цвет плаща и цвет глаз.
   */
  var cloneTemplateWizard = function (wizard) {
    var uniqeWizard = similarWizardTemplate.cloneNode(true);
    uniqeWizard.querySelector('.setup-similar-label').textContent = wizard.name;
    uniqeWizard.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    uniqeWizard.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return uniqeWizard;
  };

  /**
   *  Генерирует массив уникальных волшебников
   *
   * @param {Array} wizardsData - данные волшебников
   * @return {Array} updatedWizards - массив уникальных волшебников
   */
  var updateWizards = function (wizardsData) {
    var updateWizardsData = [];
    for (var i = 0; i < NUMBER_OF_PLAYERS; i++) {
      var wizard = utils.elementFromArray(wizardsData);
      updateWizardsData.push(cloneTemplateWizard(wizard));
    }
    return updateWizardsData;
  };

  /**
   *  Отрисовывает уникальных волшебников
   *
   * @param {Array} updatedWizards - массив уникальных волшебников
   */
  var renderWizards = function (updatedWizards) {
    var fragment = document.createDocumentFragment();
    updatedWizards.forEach(function (updatedWizard) {
      fragment.appendChild(updatedWizard);
      similarListElement.appendChild(fragment);
    });
  };

  var similarSetup = document.querySelector('.setup-similar');
  similarSetup.classList.remove('hidden');
})();
