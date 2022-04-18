import { windowScrollHandler } from './scroll.js';
import { burgerClickHandler } from './menu.js';
import { menuLinksClickHandler } from './menu.js';
import { petsCardsClickHandler } from './popup.js';
import { renderMainSlides } from './slider.js';
import { renderPageSlides } from './slider.js';
import { mainSliderControls } from './slider.js';
import { pageSliderPagination } from './slider.js';

window.onload = function () {
  windowScrollHandler();
  burgerClickHandler();
  menuLinksClickHandler();
  petsCardsClickHandler();

  if (document.body.classList.contains('home')) {
    renderMainSlides();
    mainSliderControls();
  }
  if (document.body.classList.contains('pets-page')) {
    renderPageSlides();
    pageSliderPagination();
  }
};
