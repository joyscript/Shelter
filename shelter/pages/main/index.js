import { getData } from '../../js-modules/common.js';
import { handleMenu } from '../../js-modules/menu.js';
import { makeSlider } from '../../js-modules/slider.js';
import { makeModal } from '../../js-modules/modal.js';

handleMenu();

getData('../../data/pets.json').then((pets) => {
  makeSlider(pets);
  makeModal(pets);
});