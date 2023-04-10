import { getData } from '../../js-modules/common.js';
import { handleMenu } from '../../js-modules/menu.js';
import { makeSlider } from '../../js-modules/slider.js';
import { showMessage } from '../../js-modules/message.js';

showMessage();
handleMenu();
getData('../../data/pets.json').then((pets) => makeSlider(pets));

// -------------------------------------------------------------

console.log(`Самооценка: 110/110
Реализация burger menu на обеих страницах: +26
Реализация слайдера-карусели на странице Main: +36
Реализация пагинации на странице Pets: +36
Реализация попап на обеих страницах: +12
---------------------------------------------------------------------------------------------
Файл с объектами 8 животных нельзя найти во вкладке Sources. Данные подгружаются асинхронно,
поэтому его можно найти только во вкладке Network - Fetch - pets.json.

(!) Не забудьте зайти в консоль на странице pets - там выводится важная информация по массиву.
---------------------------------------------------------------------------------------------
Здесь отображается направление перемотки слайдера и номера карточек в текущем слайде:
`);
