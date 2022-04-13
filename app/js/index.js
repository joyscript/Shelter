import { burgerClickHandler } from './menu.js';
import { menuLinksClickHandler } from './menu.js';
import { windowScrollHandler } from './scroll.js';
import { petsCardsClickHandler } from './popup.js';

window.onload = function () {
  burgerClickHandler();
  menuLinksClickHandler();
  windowScrollHandler();
  petsCardsClickHandler();
};
