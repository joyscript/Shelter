import { getData } from './common.js';

const slider = document.querySelector('.slider');
const prevBtn = slider.querySelector('.icon_arrow-prev');
const nextBtn = slider.querySelector('.icon_arrow-next');
const sliderLine = slider.querySelector('.slider__line');

const generateCard = (pet) => {
  const card = document.createElement('div');
  card.className = 'card';

  card.innerHTML = `
      <div class="card__pic">
        <img src="${pet.img}" alt="Pet ${pet.name}" />
      </div>
      <div class="card__content">
        <h3 class="card__title">${pet.name}</h3>
        <button class="button">Learn more</button>
      </div>
    `;

  return card;
};

const handleData = (pets) => {
  let cards = { left: [], active: [], right: [] };

  const makeSlide = (position) => {
    const slide = document.createElement('div');
    slide.className = 'slider__slide ';

    cards[position].length = 0;
    let arr = position === 'active' ? [...pets] : pets.filter((item) => !cards.active.includes(+item.id));

    for (let i = 0; i < 3; i++) {
      let ind = Math.floor(Math.random() * arr.length);
      slide.append(generateCard(arr[ind]));
      cards[position].push(+arr[ind].id);
      arr.splice(ind, 1);
    }

    return slide;
  };

  const changeSlide = (e) => {
    slider.classList.remove('move-left', 'move-right');

    if (e.animationName === 'to-left') {
      [cards.active, cards.right] = [[...cards.left], [...cards.active]];
      sliderLine.prepend(makeSlide('left'));
      sliderLine.lastElementChild.remove();
      console.log(JSON.stringify(cards));
    } else {
      [cards.active, cards.left] = [[...cards.right], [...cards.active]];
      sliderLine.append(makeSlide('right'));
      sliderLine.firstElementChild.remove();
      console.log(JSON.stringify(cards));
    }
  };

  sliderLine.append(makeSlide('active'));
  sliderLine.prepend(makeSlide('left'));
  sliderLine.append(makeSlide('right'));
  console.log(JSON.stringify(cards));

  prevBtn.addEventListener('click', () => slider.classList.add('move-left'));
  nextBtn.addEventListener('click', () => slider.classList.add('move-right'));
  slider.addEventListener('animationend', changeSlide);
};

export const sliderHandler = () => getData('../../data/pets.json').then((data) => handleData(data));
