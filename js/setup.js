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
 * @return {Array} playersNames - возвращает массив необходимых имен игроков.
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
 * @return {string} someArray - возвращает случайное значение.
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
 * @param {number} numberOfPlayers - необходимое количество игроков.
 * @param {number} i - номер итерации.
 * @return {Array} wizards - возвращает массив объектов со свойствами: имя, цвет плаща и цвет глаз для каждого волшебника.
 */
var getWizards = function (colorCoats, colorEyes, numberOfPlayers, i) {
  var wizards = [];
  var wizard = {
    name: allWizardsNames[i],
    coatColor: getElementFromArray(colorCoats),
    eyesColor: getElementFromArray(colorEyes)
  };
  wizards[i] = wizard;
  return wizards;
};

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var allWizardsNames = getNames(FIRST_NAMES, LAST_NAMES, NUMBER_OF_PLAYERS, i);
var playersNames = [];
for (var i = 0; i < NUMBER_OF_PLAYERS; i++) {
  playersNames[i] = getElementFromArray(allWizardsNames);
  var wizards = getWizards(COAT_COLORS, EYES_COLORS, NUMBER_OF_PLAYERS, i);
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = allWizardsNames[i];
  wizardElement.querySelector('.wizard-coat').style.fill = wizards[i].coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizards[i].eyesColor;
  similarListElement.appendChild(wizardElement);
}

var similarSetup = document.querySelector('.setup-similar');
similarSetup.classList.remove('hidden');
