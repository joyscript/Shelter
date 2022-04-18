import { data } from './data.js';

const generatePetCard = (pet) => {
  let card = document.createElement('article');
  card.className = 'pet-card';
  card.setAttribute('data-pet', pet.name);

  let template = `
    <div class="pet-card__image">
      <img src=${pet.img} alt="Pet ${pet.name}" />
    </div>
    <div class="pet-card__content">
      <h4 class="pet-card__title">${pet.name}</h4>
      <div class="button button_bordered">Learn more</div>
    </div>`;

  card.innerHTML = template;
  return card;
};

// ------------------------------------

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// -----------------------------------

const allCards = [];
data.forEach((pet) => allCards.push(generatePetCard(pet)));

const mainCards = allCards.slice(0, 8);
const otherCards = allCards.slice(8);

const getCardsOnMainPage = () => {
  let cardsOnPage;

  if (window.innerWidth >= 1280) {
    cardsOnPage = 3;
  } else if (window.innerWidth < 768) {
    cardsOnPage = 1;
  } else {
    cardsOnPage = 2;
  }
  return cardsOnPage;
};

const getCardsOnPage = () => {
  let cardsOnPage;

  if (window.innerWidth >= 1280) {
    cardsOnPage = 8;
  } else if (window.innerWidth < 768) {
    cardsOnPage = 3;
  } else {
    cardsOnPage = 6;
  }
  return cardsOnPage;
};

const getShuffledCards = () => {
  shuffle(mainCards);
  shuffle(otherCards);
  let shufAllCards = [...mainCards, ...otherCards];
  return shufAllCards;
};

const generateSlides = (cardsOnPage, slider) => {
  let slidesCount = Math.floor(data.length / cardsOnPage);
  let shufAllCards = getShuffledCards();
  let slides = [];

  for (let i = 0; i < slidesCount; i++) {
    let slide = document.createElement('div');
    slide.className = `slide ${slider}__slide`;
    let slideCards = shufAllCards.splice(0, cardsOnPage);

    slide.append(...slideCards);
    slides.push(slide);
  }

  slides[0].classList.add('active');
  return slides;
};

//  -------------------------------------

export const renderMainSlides = () => {
  const slider = document.querySelector('.main-slider');
  slider.innerHTML = '';

  const cardsOnPage = getCardsOnMainPage();
  const slides = generateSlides(cardsOnPage, 'main-slider');
  slider.append(...slides);
};

export const renderPageSlides = () => {
  const slider = document.querySelector('.page-slider');
  slider.innerHTML = '';

  const cardsOnPage = getCardsOnPage();
  const slides = generateSlides(cardsOnPage, 'page-slider');
  slider.append(...slides);
};
