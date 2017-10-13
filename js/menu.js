'use strict';
(function () {
  var pageHeader = document.querySelector('.page-header');
  var menuButton = pageHeader.querySelector('.page-header__button');
  var topMenu = pageHeader.querySelector('.top-menu');

  topMenu.classList.remove('top-menu--nojs');
  topMenu.classList.add('top-menu--closed');

  menuButton.addEventListener('click', function () {
    var overly = document.createElement('div');
    overly.className = 'page-header__overly';
    var pageOverly = pageHeader.querySelector('.page-header__overly');

    if (topMenu.classList.contains('top-menu--closed')) {
      topMenu.classList.remove('top-menu--closed');
      topMenu.classList.add('top-menu--opened');
      menuButton.classList.add('page-header__button--opened');
      pageHeader.appendChild(overly)
    }
    else {
      topMenu.classList.add('top-menu--closed');
      topMenu.classList.remove('top-menu--opened');
      menuButton.classList.remove('page-header__button--opened');
      pageHeader.removeChild(pageOverly)
    }
  });
})();
