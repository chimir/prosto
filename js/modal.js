'use strict';
(function () {
  var modal = document.querySelector('.modal');
  var personalArea = modal.querySelector('.modal__wrap--personal-area');
  var feedback = modal.querySelector('.modal__wrap--feedback');

  var call = document.querySelector('.user-nav__link--call');
  var user = document.querySelector('.user-nav__link--user');

  var body = document.querySelector('body');

  var openModal = function (element) {
    body.style.overflow = 'hidden';
    modal.style.display = 'block';
    element.style.display = 'block';
  };

  var closeModal = function (element) {
    modal.style.display = 'none';
    element.style.display = 'none';
    body.removeAttribute('style');
  };

  var changeModal = function (clickElement, element) {
    var modalClose = modal.querySelector('.modal__close');

    clickElement.addEventListener('click', function (evt) {
      openModal(element);
      evt.preventDefault();
    });

    // Закрытие диалогового окна при нажатии Ssc.
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 27) {
        closeModal(element);
      }
    });

    // Закрытие диалогового окна при нажатии на крестик.
    modalClose.addEventListener('click', function () {
      closeModal(element);
    });

    // Закрытие диалогового окна при нажатии за пределпми окна.
    modal.addEventListener('click', function (evt) {
      var target = evt.target;

      if (target === this) {
        closeModal(element);
      }
    });
  };

  changeModal(call, feedback);
  changeModal(user, personalArea);
})();
