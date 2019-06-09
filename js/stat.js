'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_SHADOW_GAP = 10;
var CLOUD_COLOR = 'rgba(255, 255, 255, 1)';
var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
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
 * @param {object} ctx - контекст canvas.
 * @param {number} cloudX - начальная координата X.
 * @param {number} cloudY - начальная координата Y.
 * @param {string} shadowColor - значение цвета тени в цветовом пространстве rgba.
 * @param {number} cloudShadowGap - отступ тени.
 * @param {string} cloudColor - значение цвета облака в цветовом пространстве rgba.
 * @param {number} cloudWidth - ширина облака.
 * @param {number} cloudHeight - высота облака.
 */
var renderCloud = function (ctx, cloudX, cloudY, shadowColor, cloudShadowGap, cloudColor, cloudWidth, cloudHeight) {
  ctx.fillStyle = shadowColor;
  ctx.fillRect(cloudX + cloudShadowGap, cloudY + cloudShadowGap, cloudWidth, cloudHeight);
  ctx.fillStyle = cloudColor;
  ctx.fillRect(cloudX, cloudY, cloudWidth, cloudHeight);
};

/**
 * Создает текст в облаке
 *
 * @param {object} ctx - контекст canvas.
 * @param {string} textContent - текст, который необходимо отобразить.
 * @param {number} textX - координата X.
 * @param {number} textY - координата Y.
 * @param {string} fontStyle - цвет текста.
 * @param {string} fontProperty - параметры текста.
 */
var renderText = function (ctx, textContent, textX, textY, fontStyle, fontProperty) {
  ctx.fillStyle = fontStyle;
  ctx.font = fontProperty;
  ctx.fillText(textContent, textX, textY);
};

/**
 * Создает имена игроков
 *
 * @param {object} ctx - контекст canvas.
 * @param {array} names - массив с именами игроков.
 * @param {number} i - номер итерации
 * @param {number} nameX - начальная координата X.
 * @param {number} nameY - начальная координата Y.
 * @param {number} barWidth - ширина бара.
 * @param {number} gap - отступ бара.
 */
var renderPlayersNames = function (ctx, names, i, nameX, nameY, barWidth, gap) {
  renderText(ctx, names[i], nameX + (barWidth + gap) * i, nameY);
};

/**
 * Создает времена прохождения для каждого игрока.
 *
 * @param {object} ctx - контекст canvas.
 * @param {array} times - массив времен для каждого из игроков.
 * @param {number} i - номер итерации
 * @param {number} timesX - начальная координата X.
 * @param {number} timesY - начальная координата Y.
 * @param {number} barWidth - ширина бара.
 * @param {number} gap - отступ бара.
 * @param {number} histogramMaxHeight - максимальная высота гитограммы.
 * @param {number} timesVerticalGap - вертикальный отступ.
 */
var renderPlayersTimes = function (ctx, times, i, timesX, timesY, barWidth, gap, histogramMaxHeight, timesVerticalGap) {
  var maxTime = getMaxTime(times);
  renderText(ctx, Math.floor(times[i]), timesX + (barWidth + gap) * i, timesY - histogramMaxHeight * times[i] / maxTime - timesVerticalGap);
};

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
 * Создает гистограммы.
 *
 * @param {object} ctx - контекст canvas.
 * @param {array} names - массив с именами игроков.
 * @param {array} times - массив времен для каждого из игроков.
 * @param {number} i - номер итерации
 * @param {number} barX - начальная координата X.
 * @param {number} barY - начальная координата Y.
 * @param {number} barWidth - ширина бара.
 * @param {number} gap - отступ бара.
 * @param {number} histogramMaxHeight - максимальная высота гитограммы.
 */
var renderPlayerBar = function (ctx, names, times, i, barX, barY, barWidth, gap, histogramMaxHeight) {
  var maxTime = getMaxTime(times);
  ctx.fillStyle = (names[i] === 'Вы') ? PLAYER_COLOR : anotherColor();
  ctx.fillRect(barX + (barWidth + gap) * i, barY, barWidth, -histogramMaxHeight * times[i] / maxTime);
};

/**
 * Создает облако со статистикой прохождения игры.
 *
 * @param {object} ctx - контекст canvas.
 * @param {array} names - массив с именами игроков.
 * @param {array} times - массив времен для каждого из игроков.
 */
window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X, CLOUD_Y, SHADOW_COLOR, CLOUD_SHADOW_GAP, CLOUD_COLOR, CLOUD_WIDTH, CLOUD_HEIGHT);

  renderText(ctx, 'Ура вы победили!', 120, 40, FONT_STYLE, FONT_PROPERTY);
  renderText(ctx, 'Список результатов:', 120, 60, FONT_STYLE, FONT_PROPERTY);

  for (var i = 0; i < times.length; i++) {
    renderPlayerBar(ctx, names, times, i, BAR_X, BAR_Y, BAR_WIDTH, GAP, HISTORGAM_MAX_HEIGHT);
    ctx.fillStyle = FONT_STYLE;
    renderPlayersNames(ctx, names, i, NAME_X, NAME_Y, BAR_WIDTH, GAP);
    renderPlayersTimes(ctx, times, i, TIMES_X, TIMES_Y, BAR_WIDTH, GAP, HISTORGAM_MAX_HEIGHT, TIMES_VERTICAL_GAP);
  }
};
