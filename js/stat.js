'use strict';

(function () {
  var Cloud = {
    WIDTH: 420,
    HEIGHT: 270,
    X: 100,
    Y: 10,
    SHADOW_GAP: 10,
    COLOR: 'rgba(255, 255, 255, 1)',
    SHADOW_COLOR: 'rgba(0, 0, 0, 0.7)'
  };
  var NameCoords = {
    X: 140,
    Y: 260
  };
  var TimesCoords = {
    X: 140,
    Y: 240
  };
  var Font = {
    COLOR: 'rgb(0, 0, 0)',
    SIZE: '16px',
    FAMILY: 'PT Mono'
  };
  var BAR = {
    WIDTH: 40,
    X: 140,
    Y: 240
  };
  var HISTORGAM_MAX_HEIGHT = 150;
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
   */
  var renderCloud = function (ctx) {
    ctx.fillStyle = Cloud.COLOR;
    ctx.fillRect(Cloud.X + Cloud.SHADOW_GAP, Cloud.Y + Cloud.SHADOW_GAP, Cloud.WIDTH, Cloud.HEIGHT);
    ctx.fillStyle = Cloud.COLOR;
    ctx.fillRect(Cloud.X, Cloud.Y, Cloud.WIDTH, Cloud.HEIGHT);
  };

  /**
   * Создает текст в облаке
   *
   * @param {object} ctx - контекст canvas.
   * @param {string} textContent - текст, который необходимо отобразить.
   * @param {number} textX - координата X.
   * @param {number} textY - координата Y.
   */
  var renderText = function (ctx, textContent, textX, textY) {
    ctx.fillStyle = Font.COLOR;
    ctx.font = Font.SIZE + Font.FAMILY;
    ctx.fillText(textContent, textX, textY);
  };

  /**
   * Создает имена игроков
   *
   * @param {Object} ctx - контекст canvas.
   * @param {Array} names - массив с именами игроков.
   * @param {number} i - номер итерации
   */
  var renderPlayersNames = function (ctx, names, i) {
    renderText(ctx, names[i], NameCoords.X + (BAR.WIDTH + GAP) * i, NameCoords.Y);
  };

  /**
   * Создает времена прохождения для каждого игрока.
   *
   * @param {Object} ctx - контекст canvas.
   * @param {Array} times - массив времен для каждого из игроков.
   * @param {number} i - номер итерации
   */
  var renderPlayersTimes = function (ctx, times, i) {
    var maxTime = getMaxTime(times);
    renderText(ctx, Math.floor(times[i]), TimesCoords.X + (BAR.WIDTH + GAP) * i, TimesCoords.Y - HISTORGAM_MAX_HEIGHT * times[i] / maxTime - TIMES_VERTICAL_GAP);
  };

  /**
   * Определяем максимальное время прохождения игры.
   *
   * @param {Array} times - массив времен для каждого из игроков.
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
   * @param {Object} ctx - контекст canvas.
   * @param {Array} names - массив с именами игроков.
   * @param {Array} times - массив времен для каждого из игроков.
   * @param {number} i - номер итерации
   */
  var renderPlayerBar = function (ctx, names, times, i) {
    var maxTime = getMaxTime(times);
    ctx.fillStyle = (names[i] === 'Вы') ? PLAYER_COLOR : anotherColor();
    ctx.fillRect(BAR.X + (BAR.WIDTH + GAP) * i, BAR.Y, BAR.WIDTH, -HISTORGAM_MAX_HEIGHT * times[i] / maxTime);
  };

  /**
   * Создает облако со статистикой прохождения игры.
   *
   * @param {Object} ctx - контекст canvas.
   * @param {Array} names - массив с именами игроков.
   * @param {Array} times - массив времен для каждого из игроков.
   */
  window.renderStatistics = function (ctx, names, times) {
    renderCloud(ctx);

    renderText(ctx, 'Ура вы победили!', 120, 40);
    renderText(ctx, 'Список результатов:', 120, 60);

    for (var i = 0; i < times.length; i++) {
      renderPlayerBar(ctx, names, times, i);
      ctx.fillStyle = Font.COLOR;
      renderPlayersNames(ctx, names, i);
      renderPlayersTimes(ctx, times, i);
    }
  };
  window.stat = {
    fontSettings: Font
  };
})();
