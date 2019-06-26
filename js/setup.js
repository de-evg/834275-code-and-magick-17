'use strict';

(function () {
  var NUMBER_OF_PLAYERS = 4;

  var FIRST_NAMES = [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ];

  var LAST_NAMES = [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ];

  var COAT_COLORS = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];

  var EYES_COLORS = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];

  var utils = window.utils;

  /**
   * Создает массив случайных имен и фамилий игроков
   *
   * @param {Array} names - массив имен.
   * @param {Array} surnames - массив фамилий.
   * @return {Array} allNames - возвращает массив необходимых имен игроков.
   */
  var getNames = function (names, surnames) {
    var allNames = [];

    names.forEach(function (item, i) {
      var j = Math.floor(names.length * Math.random());
      allNames[i] = item + ' ' + surnames[j];
    });

    return allNames;
  };

  /**
   * Создает объект уникального волшебника
   *
   * @param {Array} colorCoats - массив значений цветов плащей.
   * @param {Array} colorEyes - массив значений цвета глаз.
   * @param {string} wizardName - строка с именем.
   * @return {Object} wizard - возвращает массив объектов со свойствами: имя, цвет плаща и цвет глаз для каждого волшебника.
   */
  var getWizard = function (colorCoats, colorEyes, wizardName) {
    var wizard = {
      name: wizardName,
      coatColor: utils.getElementFromArray(colorCoats),
      eyesColor: utils.getElementFromArray(colorEyes)
    };
    return wizard;
  };

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');

  var allWizardsNames = getNames(FIRST_NAMES, LAST_NAMES);

  /**
   * Генерирует новый обект на основе клона шаблона волшебника
   *
   * @param {Object} wizard - объект с данными волшебника.
   * @return {Object} uniqeWizard - возвращает клон шаблона с измененными свойствами: имя, цвет плаща и цвет глаз.
   */
  var cloneTemplateWizard = function (wizard) {
    var uniqeWizard = similarWizardTemplate.cloneNode(true);
    uniqeWizard.querySelector('.setup-similar-label').textContent = wizard.wizardName;
    uniqeWizard.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    uniqeWizard.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    similarListElement.appendChild(uniqeWizard);

    return uniqeWizard;
  };

  /**
   * Добавляет новый объект в DOM
   *
   * @param {Object} wizard - объект с данными волшебника
   */
  var addWizard = function (wizard) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(cloneTemplateWizard(wizard));
    similarListElement.appendChild(fragment);
  };

  for (var i = 0; i < NUMBER_OF_PLAYERS; i++) {
    var wizard = getWizard(COAT_COLORS, EYES_COLORS, allWizardsNames[i]);
    addWizard(wizard);
  }

  var similarSetup = document.querySelector('.setup-similar');
  similarSetup.classList.remove('hidden');
})();
