'use strict';

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

var setup = document.querySelector('.setup');
setup.classList.remove('hidden');

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
 * Получает случайный элемент массива
 *
 * @param {Array} someArray - массив значений.
 * @return {string} someArray[i] - возвращает случайное значение.
 */
var getElementFromArray = function (someArray) {
  var i = Math.floor(someArray.length * Math.random());
  return someArray[i];
};

/**
 * Создает массив уникальных волшебников
 *
 * @param {Array} colorCoats - массив значений цветов плащей.
 * @param {Array} colorEyes - массив значений цвета глаз.
 * @param {string} wizardName - строка с именем.
 * @return {Array} wizard - возвращает массив объектов со свойствами: имя, цвет плаща и цвет глаз для каждого волшебника.
 */
var getWizard = function (colorCoats, colorEyes, wizardName) {
  var wizard = {
    name: wizardName,
    coatColor: getElementFromArray(colorCoats),
    eyesColor: getElementFromArray(colorEyes)
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
 * @param {number} numberOfplayers - количество игроков.
 * @param {Array} coatColors - массив значений цветов плащей.
 * @param {Array} eyesColors - массив значений цвета глаз.
 * @param {string} wizardName - строка с именем.
 * @return {Array} wizardElement - возвращает массив объектов со свойствами: имя, цвет плаща и цвет глаз для каждого волшебника.
 */
var generateWizard = function (numberOfplayers, coatColors, eyesColors, wizardName) {
  var wizard = getWizard(coatColors, eyesColors, wizardName);
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizardName;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  similarListElement.appendChild(wizardElement);

  return wizardElement;
};
var fragment = document.createDocumentFragment();

var renderWizards = function (numberOfPlayers, coatColors, eyesColors, wizardName) {
  fragment.appendChild(generateWizard(numberOfPlayers, coatColors, eyesColors, wizardName));
  similarListElement.appendChild(fragment);
};

for (var i = 0; i < NUMBER_OF_PLAYERS; i++) {
  renderWizards(NUMBER_OF_PLAYERS, COAT_COLORS, EYES_COLORS, allWizardsNames[i]);
}

var similarSetup = document.querySelector('.setup-similar');
similarSetup.classList.remove('hidden');
