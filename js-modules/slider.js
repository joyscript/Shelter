import { generateCard } from './card.js';

const makeSlider = (pets) => {
  const slider = document.querySelector('.slider');
  const prevBtn = slider.querySelector('.icon_arrow-prev');
  const nextBtn = slider.querySelector('.icon_arrow-next');
  const sliderLine = slider.querySelector('.slider__line');

  const pointLarge = 1150;
  const pointSmall = 768;

  const getCardsCountPerPage = () => {
    return window.innerWidth >= pointLarge ? 3 : window.innerWidth >= pointSmall ? 2 : 1;
  };

  let curCount = getCardsCountPerPage();

  let nums = [0, 1, 2, 3, 4, 5, 6, 7];
  let curArr = [[], [], []];
  let forbidden = [];

  const addRandomCardsToSlide = (slide, pos, count) => {
    let arr = nums.filter((num) => {
      let exNums = pos === 1 || curCount === 1 ? [...curArr.flat()] : [...curArr[pos], ...curArr[1]];
      if (pos !== 1) exNums.push(...forbidden);
      return !exNums.includes(num);
    });

    for (let i = 0; i < count; i++) {
      let ind = Math.floor(Math.random() * arr.length);
      curArr[pos].push(arr[ind]);
      slide.append(generateCard(pets[arr[ind]]));
      arr.splice(ind, 1);
    }
  };

  const makeSlide = (pos) => {
    curArr[pos].length = 0;
    const slide = document.createElement('div');
    slide.className = 'slider__slide ';
    addRandomCardsToSlide(slide, pos, curCount);
    return slide;
  };

  const removeLastCards = () => {
    curArr = curArr.map((arr) => arr.slice(0, curCount));
    [...sliderLine.children].forEach((slide) => {
      [...slide.children].forEach((card, ind) => ind > curCount - 1 && card.remove());
    });
  };

  const changeSlide = (e) => {
    slider.classList.remove('move-left', 'move-right');

    if (curArr[0].length > curCount) removeLastCards();

    if (e.animationName === 'to-left') {
      forbidden[0] = curArr[2][0];
      [[...curArr[1]], [...curArr[2]]] = [[...curArr[0]], [...curArr[1]]];
      sliderLine.prepend(makeSlide(0));
      sliderLine.lastElementChild.remove();
      console.log(`left:  [${curArr[1]}]`);
    } else {
      forbidden[1] = curArr[0][0];
      [[...curArr[0]], [...curArr[1]]] = [[...curArr[1]], [...curArr[2]]];
      sliderLine.append(makeSlide(2));
      sliderLine.firstElementChild.remove();
      console.log(`right: [${curArr[1]}]`);
    }
  };

  const changeSliderOnResize = () => {
    let prevCount = curCount;
    curCount = getCardsCountPerPage();
    if (curCount === prevCount) return;

    if (curCount > prevCount && curCount > curArr[0].length) {
      [...sliderLine.children].forEach((slide, pos) => {
        addRandomCardsToSlide(slide, pos, curCount - prevCount);
      });
    }
    console.log(`curr:  [${curArr[1].slice(0, curCount)}]`);
  };

  for (let i = 0; i < 3; i++) sliderLine.append(makeSlide(i));
  console.log(`curr:  [${curArr[1]}]`);

  prevBtn.addEventListener('click', () => slider.classList.add('move-left'));
  nextBtn.addEventListener('click', () => slider.classList.add('move-right'));
  slider.addEventListener('animationend', changeSlide);
  window.addEventListener('resize', changeSliderOnResize);
};

export { makeSlider };
