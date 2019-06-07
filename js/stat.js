'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var NAME_X = 140;
var NAME_Y = 260;
var TIMES_X = 140;
var TIMES_Y = 240;
var FONT_STYLE = 'rgb(0, 0, 0)';
var FONT_PROPERTY = '16px "PT Mono"';
var HISTORGAM_MAX_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_X = 140;
var BAR_Y = 240;
var GAP = 50;
var TIMES_VERTICAL_GAP = 10;
var PLAYER_COLOR = 'rgba(255, 0, 0, 1)';


/**
* Определяем цвета гистограммы для других игроков
*
* @return {string} значение цвета в цветовом пространстве hsl.
*/
var anotherColor = function () {
  var color = 'hsl(240, ' + 100 * Math.random() + '%, 50%)';
  return color;
};

/**
* Создает облако
*
* @constuctor
* @param {object} ctx - контекст canvas.
* @param {number} cloudX - координата X.
* @param {number} cloudY - координата Y.
* @param {string} cloudColor - значение цвета в цветовом пространстве rgba.
*/
var renderCloud = function (ctx, cloudX, cloudY, cloudColor) {
  ctx.fillStyle = cloudColor;
  ctx.fillRect(cloudX, cloudY, CLOUD_WIDTH, CLOUD_HEIGHT);

  ctx.fillStyle = cloudColor;
  ctx.fillRect(cloudX, cloudY, CLOUD_WIDTH, CLOUD_HEIGHT);
};

/**
* Создает текст в облаке
*
* @constuctor
* @param {object} ctx - контекст canvas.
* @param {string} textContent - текст, который необходимо отобразить.
* @param {number} textX - координата X.
* @param {number} textY - координата Y.
*/
var renderCloudeText = function (ctx, textContent, textX, textY) {
  ctx.fillStyle = FONT_STYLE;
  ctx.font = FONT_PROPERTY;
  ctx.fillText(textContent, textX, textY);
};

/**
* Создает имена игроков
*
* @constuctor
* @param {object} ctx - контекст canvas.
* @param {array} names - массив с именами игроков.
*/
var renderPlayersNames = function (ctx, names) {
  for (var i = 0; i < names.length; i++) {
    renderCloudeText(ctx, names[i], NAME_X + (BAR_WIDTH + GAP) * i, NAME_Y);
  }
};

/**
* Создает времена прохождения для каждого игрока.
*
* @constuctor
* @param {object} ctx - контекст canvas.
* @param {array} times - массив времен для каждого из игроков.
*/
var renderPlayersTimes = function (ctx, times) {
  var maxTime = getMaxTime(times);
  for (var i = 0; i < times.length; i++) {
    renderCloudeText(ctx, Math.floor(times[i]), TIMES_X + (BAR_WIDTH + GAP) * i, TIMES_Y - HISTORGAM_MAX_HEIGHT * times[i] / maxTime - TIMES_VERTICAL_GAP);
  }
};

// определение максимального времени
/**
* Определяем максимальное время прохождения игры.
*
* @param {array} times - массив времен для каждого из игроков.
* @return {numder} maxTime - возвращает максимальное время прохождения игры.
*/
var getMaxTime = function (times) {
  var maxTime = 0;
  for (var i = 0; i < times.length; i++) {
    if (maxTime < times[i]) {
      maxTime = times[i];
    }
  }
  return maxTime;
};

/**
* Создает гистограмму.
*
* @constuctor
* @param {object} ctx - контекст canvas.
* @param {array} names - массив с именами игроков.
* @param {array} times - массив времен для каждого из игроков.
*/
var renderPlayerBar = function (ctx, names, times) {
  var maxTime = getMaxTime(times);
  for (var i = 0; i < times.length; i++) {
    if (names[i] === 'Вы') {
      ctx.fillStyle = PLAYER_COLOR;
      ctx.fillRect(BAR_X + (BAR_WIDTH + GAP) * i, BAR_Y, BAR_WIDTH, -HISTORGAM_MAX_HEIGHT * times[i] / maxTime);
    } else {
      ctx.fillStyle = anotherColor();
      ctx.fillRect(BAR_X + (BAR_WIDTH + GAP) * i, BAR_Y, BAR_WIDTH, -HISTORGAM_MAX_HEIGHT * times[i] / maxTime);
    }
  }
};

/**
* Создает облако со статистикой прохождения игры.
*
* @constuctor
* @param {object} ctx - контекст canvas.
* @param {array} names - массив с именами игроков.
* @param {array} times - массив времен для каждого из игроков.
*/
window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, 110, 20, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, 100, 10, 'rgba(255, 255, 255, 1)');

  renderCloudeText(ctx, 'Ура вы победили!', 120, 40);
  renderCloudeText(ctx, 'Список результатов:', 120, 60);

  renderPlayersNames(ctx, names);
  renderPlayersTimes(ctx, times);
  renderPlayerBar(ctx, names, times);
};
