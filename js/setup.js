'use strict';

var setup = document.querySelector('.setup');
setup.classList.remove('hidden');

var firstNames = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var lastNames = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var coatColor = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var eyesColor = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var wizards = [];
var NUMBER_OF_PLAYERS = 4;

/**
 * Создает массив случайных имен и фамилий игроков
 *
 * @param {array} names - массив имен.
 * @param {array} surnames - массив фамилий.
 * @param {number} numberOfPlayers - необходимое количество игроков.
 * @return {array} playersNames - возвращает массив необходимых имен игроков.
 */
var getNames = function (names, surnames, numberOfPlayers) {
  var allNames = [];
  var playersNames = [];
  for (var i = 0; i < firstNames.length; i++) {
    var j = Math.floor(i * Math.random());
    allNames[i] = firstNames[i] + ' ' + lastNames[j];
  }
  for (i = 0; i < numberOfPlayers; i++) {
    j = Math.floor(allNames.length * Math.random());
    playersNames[i] = allNames[j];
  }
  return playersNames;
};

/**
 * Получает случайный цвет плаща
 *
 * @param {array} colorCoat - массив значений цветов плащей.
 * @return {string} coatColor - возвращает значение цвета плаща.
 */
var getCoatColor = function (colorCoat) {
  var i = Math.floor(colorCoat.length * Math.random());
  return coatColor[i];
};

/**
 * Получает случайный цвет глаз
 *
 * @param {array} colorEyes - массив значений цвета глаз.
 * @return {string} coatColor - возвращает значение цвета глаз.
 */
var getEyesColor = function (colorEyes) {
  var i = Math.floor(colorEyes.length * Math.random());
  return eyesColor[i];
};

/**
 * Создает массив уникальных волшебников
 *
 * @param {array} names - массив имен.
 * @param {array} surnames - массив фамилий.
 * @param {array} colorCoat - массив значений цветов плащей.
 * @param {array} colorEyes - массив значений цвета глаз.
 * @return {array} wizards - возвращает массив объектов со свойствами: имя, цвет плаща и цвет глаз для каждого волшебника.
 */
var getWizards = function (names, surnames, colorCoat, colorEyes) {
  for (var i = 0; i < wizardsNames.length; i++) {
    var wizard = {
      name: wizardsNames[i],
      coatColor: getCoatColor(colorCoat),
      eyesColor: getEyesColor(colorEyes)
    };
    wizards[i] = wizard;
  }
  return wizards;
};

var wizardsNames = getNames(firstNames, lastNames, NUMBER_OF_PLAYERS);
wizards = getWizards(firstNames, lastNames, coatColor, eyesColor);


var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

for (var i = 0; i < wizardsNames.length; i++) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizardsNames[i];
  wizardElement.querySelector('.wizard-coat').style.fill = wizards[i].coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizards[i].eyesColor;
  similarListElement.appendChild(wizardElement);
}

var similarSetup = document.querySelector('.setup-similar');
similarSetup.classList.remove('hidden');
