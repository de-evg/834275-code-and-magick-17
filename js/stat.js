"use strict"

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var NAME_X = 140;
var NAME_Y = 260;
var TIMES_X = 140;
var TIMES_Y = 240;
var FONT_STYLE = "rgb(0, 0, 0)";
var FONT_PROPERTY = "16px 'PT Mono'";
var HISTORGAM_MAX_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_X = 140;
var BAR_Y = 240;
var GAP = 50;
var TIMES_VERTICAL_GAP = 10;
var PLAYER_COLOR = "rgba(255, 0, 0, 1)";


//конструктор облаков
var renderCloud = function (ctx, cloudX, cloudY, cloudColor) {
  ctx.fillStyle = cloudColor;
  ctx.fillRect(cloudX, cloudY, CLOUD_WIDTH, CLOUD_HEIGHT);

  ctx.fillStyle = cloudColor;
  ctx.fillRect(cloudX, cloudY, CLOUD_WIDTH, CLOUD_HEIGHT);
}

//конструктор текста
var renderCloudeText = function (ctx, textContent, textX, textY) {
  ctx.fillStyle = FONT_STYLE;
  ctx.font = FONT_PROPERTY;
  ctx.fillText(textContent, textX, textY);
}

//отрисовываем имена игроков
var renderPlayersNames = function (ctx, names) {
  for (var i = 0; i < names.length; i++) {
    renderCloudeText(ctx, names[i], NAME_X + (BAR_WIDTH + GAP) * i, NAME_Y);
  }
}

//отрисовываем время прохождения каждого игрока
var renderPlayersTimes = function (ctx, times) {
  var maxTime = getMaxTime(times);
  for (var i = 0; i < times.length; i++) {
    renderCloudeText(ctx, Math.floor(times[i]), TIMES_X + (BAR_WIDTH + GAP) * i, TIMES_Y - HISTORGAM_MAX_HEIGHT * times[i] / maxTime - TIMES_VERTICAL_GAP);
  }
}

//определяем максимальное время
var getMaxTime = function (times) {
  var maxTime = 0;
  for (var i = 0; i < times.length; i++) {
    if (maxTime < times[i]) {
      maxTime = times[i];
    }
  }
  return maxTime;
}

//строим гистограмму
var renderPlayerBar = function (ctx, times) {
  var maxTime = getMaxTime(times);
  for (var i = 0; i < times.length; i++) {
    ctx.fillRect(BAR_X + (BAR_WIDTH + GAP) * i, BAR_Y, BAR_WIDTH, - HISTORGAM_MAX_HEIGHT * times[i] / maxTime);
  }
}

window.renderStatistics = function (ctx, names, times) {
  console.log(times);
  renderCloud(ctx, 110, 20, "rgba(0, 0, 0, 0.7)");
  renderCloud(ctx, 100, 10, "rgba(255, 255, 255, 1)");

  renderCloudeText(ctx, "Ура вы победили!", 120, 40);
  renderCloudeText(ctx, "Список результатов:", 120, 60);

  renderPlayersNames(ctx, names);
  renderPlayersTimes(ctx, times);
  ctx.fillStyle = "blue";
  renderPlayerBar(ctx, times);
}


