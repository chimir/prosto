'use strict';
(function () {
  var postSlider = document.querySelector('.post-slider');

  var tabNews = postSlider.querySelector('.tabs__link--news');
  var tabPublications = postSlider.querySelector('.tabs__link--publications');

  var news = postSlider.querySelector('.post-slider__news');
  var publications = postSlider.querySelector('.post-slider__publications');

  tabNews.addEventListener('click', function (evt) {
    tabNews.classList.add('tabs__link--active');
    tabPublications.classList.remove('tabs__link--active');

    news.style.display = 'block';
    publications.style.display = 'none';

    evt.preventDefault();
  });

  tabPublications.addEventListener('click', function (evt) {
    tabPublications.classList.add('tabs__link--active');
    tabNews.classList.remove('tabs__link--active');

    publications.style.display = 'block';
    news.style.display = 'none';

    evt.preventDefault();
  });
})();
