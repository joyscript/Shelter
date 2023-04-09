import { generateCard } from './card.js';

const slider = document.querySelector('.slider');
const container = slider.querySelector('.slider__container');
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

  const getRandNums = (count, arr) => {
    for (let i = 0; i < count; i++) {
      let ind = Math.floor(Math.random() * arr.length);
      res.push(arr[ind]);
      arr.splice(ind, 1);
    }
  };

  getRandNums(8, arr);
  getRandNums(4, (arr = arr.concat(...res.slice(0, 6))));
  getRandNums(4, (arr = arr.concat(...res.slice(6, 8))));
  getRandNums(2, (arr = arr.concat(...res.slice(8, 12))));
  getRandNums(6, (arr = arr.concat(...res.slice(12, 16))));

  return res;
};

const splitArrayIntoPages = (arr, count) => {
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

  const logGeneralInfo = () => {
    console.log('Исходный массив:', JSON.stringify(indArr));
    console.log('6 страниц:', JSON.stringify(splitArrayIntoPages(indArr, 8)));
    console.log('8 страниц:', JSON.stringify(splitArrayIntoPages(indArr, 6)));
    console.log('16 страниц:', JSON.stringify(splitArrayIntoPages(indArr, 3)));
    console.log('Неповторяемость карточек при количестве на странице 8, 6, 3:', checkArr(indArr).join(', '));
  };

  const logCurInfo = () => {
    console.log('-'.repeat(90));
    console.log(`Ширина экрана: ${window.innerWidth}px. ${lastPage} страниц по ${curCount} карточ${curCount === 3 ? 'ки' : 'ек'}.`);
  };

  const makePage = () => {
    let page = document.createElement('div');
    page.classList.add('slider__page');

    let curIndexes = pagesArray[curPage - 1];
    let curPets = curIndexes.map((ind) => pets[ind]);
    let curNames = curPets.map((pet) => pet.name);

    curPets.forEach((pet) => page.append(generateCard(pet)));

    console.log(`Страница ${curPage}: [${curIndexes}], имена: [${curNames.join(', ')}]`);

    return page;
  };

  const changeBtns = () => {
    pageNumBtn.textContent = curPage;
    [prevBtn, firstBtn].forEach((btn) => (btn.disabled = curPage === 1));
    [nextBtn, lastBtn].forEach((btn) => (btn.disabled = curPage === lastPage));
  };

  const startAnimation = (page) => {
    page.classList.add('next');
    page.previousElementSibling.classList.add('prev');

    const endAnimation = () => {
      page.previousElementSibling.remove();
      page.classList.remove('next');
    };
    page.addEventListener('animationend', endAnimation, { once: true });
  };

  const changePage = () => {
    let page = makePage();
    container.append(page);
    page.previousElementSibling && startAnimation(page);
    changeBtns();
  };

  const checkPage = () => {
    let prevPage = curPage;
    curCount = getCardsCountPerPage();
    lastPage = getLastPage(curCount);
    if (prevPage > lastPage) curPage = lastPage;
  };

  const changeSliderOnResize = () => {
    if (curCount !== getCardsCountPerPage()) {
      checkPage();
      pagesArray = splitArrayIntoPages(indArr, curCount);
      logCurInfo();
      container.firstElementChild.remove();
      changePage();
    }
  };

  logGeneralInfo();
  logCurInfo();
  changePage();

  nextBtn.addEventListener('click', () => changePage(++curPage));
  prevBtn.addEventListener('click', () => changePage(--curPage));
  firstBtn.addEventListener('click', () => changePage((curPage = 1)));
  lastBtn.addEventListener('click', () => changePage((curPage = lastPage)));
  window.addEventListener('resize', changeSliderOnResize);
};

export { makePetsSlider };
