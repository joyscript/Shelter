import { windowScrollHandler } from './scroll.js';
import { burgerClickHandler } from './menu.js';
import { menuLinksClickHandler } from './menu.js';
import { renderPetsCards } from './card.js';
import { mainSliderHandler } from './card.js';
import { petsCardsClickHandler } from './popup.js';


window.onload = function () {
  windowScrollHandler();
  burgerClickHandler();
  menuLinksClickHandler();
  renderPetsCards();
  mainSliderHandler();
  petsCardsClickHandler();
};
