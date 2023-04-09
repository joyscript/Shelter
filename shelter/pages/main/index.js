import { getData } from '../../js-modules/common.js';
import { handleMenu } from '../../js-modules/menu.js';
import { makeSlider } from '../../js-modules/slider.js';

handleMenu();
getData('../../data/pets.json').then((pets) => makeSlider(pets));

console.log(`Самооценка: 110/110
Реализация burger menu на обеих страницах: +26
Реализация слайдера-карусели на странице Main: +36
Реализация пагинации на странице Pets: +36
Реализация попап на обеих страницах: +12
----------------------------------------------------------------------------------------
В консоли отображается направление перемотки слайдера и номера карточек в текущем слайде:
`);
