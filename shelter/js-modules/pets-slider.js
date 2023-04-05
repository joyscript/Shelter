import { generateCard } from './common.js';

const slider = document.querySelector('.slider');
const sliderCards = slider.querySelector('.slider__cards');
const prevBtn = slider.querySelector('.button.prev');
const nextBtn = slider.querySelector('.button.next');
const firstBtn = slider.querySelector('.button.first');
const lastBtn = slider.querySelector('.button.last');
const pageNumBtn = slider.querySelector('.button.active');

const pointLarge = 1280;
const pointSmall = 768;

const make24Array = () => {
  let arr = [0, 1, 2, 3, 4, 5, 6, 7];
  let res = [];

  const getNums = (count) => {
    for (let i = 0; i < count; i++) {
      let ind = Math.floor(Math.random() * arr.length);
      res.push(arr[ind]);
      arr.splice(ind, 1);
    }
  };

  getNums(8);
  arr.push(...res.slice(0, 6));
  getNums(4);
  arr.push(...res.slice(6, 8));
  getNums(4);
  arr.push(...res.slice(8, 12));
  getNums(2);
  arr.push(...res.slice(12, 16));
  getNums(6);

  return res;
};

const splitArrayIntoPages = (arr, count) => {
  if (!count) return;
  let temp = [...arr];
  let pages = [];
  while (temp.length) {
    let page = temp.splice(0, count);
    pages.push([...page]);
  }
  return pages;
};

const checkArr = (arr) => {
  const check = (count) => {
    let temp = [...arr];
    while (temp.length) {
      let set = new Set(temp.splice(0, count));
      if (set.size !== count) return false;
    }
    return true;
  };
  return [check(8), check(6), check(3)];
};

const getCardsCountPerPage = () => {
  return window.innerWidth >= pointLarge ? 8 : window.innerWidth >= pointSmall ? 6 : 3;
};

const getLastPage = (count) => 48 / count;

// ------------------------------------------------

const makePetsSlider = (pets) => {
  const indArr = [...make24Array(), ...make24Array()];
  let curCount = getCardsCountPerPage();
  let pagesArray = splitArrayIntoPages(indArr, curCount);
  let lastPage = getLastPage(curCount);
  let curPage = 1;

  console.log(`Исходный массив: ${indArr}`);
  console.log(`Неповторяемость карточек при количестве 8, 6, 3 соответственно: ${checkArr(indArr).join(', ')}`);

  const logInfo = () => {
    console.log('-'.repeat(120));
    console.log(`Ширина экрана: ${window.innerWidth}px. `);
    console.log(`${lastPage} страниц: ${JSON.stringify(pagesArray)}`);
  };

  const changeBtns = () => {
    [prevBtn, firstBtn].forEach((btn) => (btn.disabled = curPage === 1));
    [nextBtn, lastBtn].forEach((btn) => (btn.disabled = curPage === lastPage));
  };

  const makeSlide = () => {
    sliderCards.innerHTML = '';

    let curIndexes = pagesArray[curPage - 1];
    let curPets = curIndexes.map((ind) => pets[ind]);
    let curNames = curPets.map((pet) => pet.name);

    curPets.forEach((pet) => sliderCards.append(generateCard(pet)));
    pageNumBtn.textContent = curPage;
    changeBtns();

    console.log(`Страница ${curPage}: [${curIndexes}], имена: [${curNames.join(', ')}]`);
  };

  const checkPage = () => {
    let [prevPage, prevLastPage] = [curPage, lastPage];
    curCount = getCardsCountPerPage();
    lastPage = getLastPage(curCount);
    // if (prevPage > lastPage) curPage = Math.round((prevPage / prevLastPage) * lastPage);
    if (prevPage > lastPage) curPage = lastPage;
  };

  const changeSliderOnResize = () => {
    if (curCount !== getCardsCountPerPage()) {
      checkPage();
      pagesArray = splitArrayIntoPages(indArr, curCount);
      logInfo();
      makeSlide();
    }
  };

  logInfo();
  makeSlide();

  nextBtn.addEventListener('click', () => makeSlide(++curPage));
  prevBtn.addEventListener('click', () => makeSlide(--curPage));
  firstBtn.addEventListener('click', () => makeSlide((curPage = 1)));
  lastBtn.addEventListener('click', () => makeSlide((curPage = lastPage)));
  window.addEventListener('resize', changeSliderOnResize);
};

export { makePetsSlider };
