import { windowScrollHandler } from './scroll.js';
import { burgerClickHandler } from './menu.js';
import { menuLinksClickHandler } from './menu.js';
import { renderMainSlides } from './slides.js';
import { renderPageSlides } from './slides.js';
import { mainSliderControls } from './sliderMain.js';
import { pageSliderPagination } from './sliderPage.js';

window.onload = function () {
  windowScrollHandler();
  burgerClickHandler();
  menuLinksClickHandler();

  if (document.body.classList.contains('home')) {
    renderMainSlides();
    mainSliderControls();
  } else {
    renderPageSlides();
    pageSliderPagination();
  }
};
