import { generateCard } from './card.js';

const makeSlider = (pets) => {
  const slider = document.querySelector('.slider');
  const prevBtn = slider.querySelector('.icon_arrow-prev');
  const nextBtn = slider.querySelector('.icon_arrow-next');
  const sliderLine = slider.querySelector('.slider__line');

  const pointLarge = 1024;
  const pointSmall = 768;

  const getCardsCountPerPage = () => {
    return window.innerWidth >= pointLarge ? 3 : window.innerWidth >= pointSmall ? 2 : 1;
  };

  let curCount = getCardsCountPerPage();

  let nums = [0, 1, 2, 3, 4, 5, 6, 7];
  let curArr = [[], [], []];
  let storedArr = [[], [], []]; // This is for the immutability of cards on window resize

  const addRandomCardsToSlide = (slide, pos, count) => {
    let arr = nums.filter((num) => (pos === 1 ? !curArr.flat().includes(num) : ![...curArr[pos], ...curArr[1]].includes(num)));

    for (let i = 0; i < count; i++) {
      let ind = Math.floor(Math.random() * arr.length);
      curArr[pos].push(arr[ind]);
      slide.append(generateCard(pets[arr[ind]]));
      arr.splice(ind, 1);
    }
  };

  const copyArr = (arr) => [[...arr[0]], [...arr[1]], [...arr[2]]];

  const makeSlide = (pos) => {
    curArr[pos].length = 0;
    const slide = document.createElement('div');
    slide.className = 'slider__slide ';
    addRandomCardsToSlide(slide, pos, curCount);
    storedArr = copyArr(curArr);
    return slide;
  };

  const changeSlide = (e) => {
    slider.classList.remove('move-left', 'move-right');

    if (e.animationName === 'to-left') {
      [[...curArr[1]], [...curArr[2]]] = [[...curArr[0]], [...curArr[1]]];
      sliderLine.prepend(makeSlide(0));
      sliderLine.lastElementChild.remove();
    } else {
      [[...curArr[0]], [...curArr[1]]] = [[...curArr[1]], [...curArr[2]]];
      sliderLine.append(makeSlide(2));
      sliderLine.firstElementChild.remove();
    }
    console.log(JSON.stringify(curArr), '---', JSON.stringify(storedArr));
  };

  const changeSliderOnResize = () => {
    let prevCount = curCount;
    curCount = getCardsCountPerPage();
    if (curCount === prevCount) return;

    [...sliderLine.children].forEach((slide, pos) => {
      if (curCount < prevCount) {
        curArr[pos].pop();
        slide.lastElementChild.remove();
      } else if (curCount > prevCount && curCount > storedArr[pos].length) {
        addRandomCardsToSlide(slide, pos, 1);
        storedArr = copyArr(curArr);
      } else {
        curArr[pos] = [...storedArr[pos].slice(0, curCount)];
        slide.append(generateCard(pets[curArr[pos][curCount - 1]]));
      }
    });
    console.log(JSON.stringify(curArr), '---', JSON.stringify(storedArr));
  };

  for (let i = 0; i < 3; i++) sliderLine.append(makeSlide(i));
  console.log(JSON.stringify(curArr), '---', JSON.stringify(storedArr));

  prevBtn.addEventListener('click', () => slider.classList.add('move-left'));
  nextBtn.addEventListener('click', () => slider.classList.add('move-right'));
  slider.addEventListener('animationend', changeSlide);
  window.addEventListener('resize', changeSliderOnResize);
};

export { makeSlider };
