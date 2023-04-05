import { getData } from '../../js-modules/common.js';
import { handleMenu } from '../../js-modules/menu.js';
import { makePetsSlider } from '../../js-modules/pets-slider.js';
import { makeModal } from '../../js-modules/modal.js';

handleMenu();

getData('../../data/pets.json').then((pets) => {
  makePetsSlider(pets);
  makeModal(pets);
});