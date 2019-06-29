'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var EYES_COLORS = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];

  var COAT_COLORS = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];

  var FIREBALL_COLORS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];

  var DefaultStartCoodinate = {
    X: 50,
    Y: 80
  };
  var setupDialogElement = document.querySelector('.setup');
  var dialogHandler = setupDialogElement.querySelector('.upload');
  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var setupUserName = setup.querySelector('.setup-user-name');
  console.log(setupUserName);
  var playerCoatColor = setup.querySelector('.wizard-coat');
  var playerEyesColor = setup.querySelector('.wizard-eyes');
  var playerFireballColor = setup.querySelector('.setup-fireball');
  var utils = window.utils;

  /**
   * Открывает попап
   *
   * @param {Object} defaultStartCoords - координаты для позиции попапа по-умолчанию
   */
  var openPopup = function (defaultStartCoords) {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    setup.addEventListener('click', onWizardClick);
    setup.style.top = defaultStartCoords.y + 'px';
    setup.style.left = defaultStartCoords.x + '%';
  };

  setupOpen.addEventListener('click', function () {
    openPopup(DefaultStartCoodinate);
  });

  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopup(DefaultStartCoodinate);
    }
  });

  /**
   * Закрывает попап
   */
  var closePopup = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    setup.removeEventListener('click', onWizardClick);
  };

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  });

  /**
   * Закрывает попап по нажатию на ESC
   *
   * @param {Object} evt - объект события
   */
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE && !setup.querySelector('.setup-user-name:focus')) {
      closePopup();
    }
  };

  /**
   * Меняет случайно цвет элемента волшебника игрока
   * @param {Object} evt - DOM объект события
   */
  var onWizardClick = function (evt) {
    switch (evt.target) {
      case playerCoatColor:
        playerCoatColor.style.fill = utils.elementFromArray(COAT_COLORS);
        break;
      case playerEyesColor:
        playerEyesColor.style.fill = utils.elementFromArray(EYES_COLORS);
        break;
      case playerFireballColor:
        var fireballColor = evt.target.closest('.setup-fireball-wrap');
        fireballColor.style.background = utils.elementFromArray(FIREBALL_COLORS);
        break;
    }
  };

  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoordinate = {
      x: evt.clientX,
      y: evt.clientY
    };

    var isDragged = false;

    /**
     * Изменяет координаты перемещаемого элемента
     * @param {Object} moveEvt - DOM объект события
     */
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      isDragged = true;

      var shift = {
        x: startCoordinate.x - moveEvt.clientX,
        y: startCoordinate.y - moveEvt.clientY
      };
      startCoordinate = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setupDialogElement.style.top = (setupDialogElement.offsetTop - shift.y) + 'px';
      setupDialogElement.style.left = (setupDialogElement.offsetLeft - shift.x) + 'px';
    };
    /**
     * Удаляет отслеживание собития при mouseup
     * @param {Object} upEvt - DOM объект события
     */
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (isDragged) {
        /**
         * Отменяет действие по-умолчанию, если элемент перемещается.
         * Удаляет отслеживание события
         * @param {Object} event - DOM объект события
         */
        var onClickPreventDefault = function (event) {
          event.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
