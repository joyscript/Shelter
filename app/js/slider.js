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

// main-slider -------------------------------------

export const renderMainSlides = () => {
  const slider = document.querySelector('.main-slider');
  slider.innerHTML = '';

  const cardsOnPage = getCardsOnMainPage();
  const slides = generateSlides(cardsOnPage, 'main-slider');
  slider.append(...slides);
};

export const mainSliderControls = () => {
  let slides = document.querySelectorAll('.main-slider__slide');
  const prevBtn = document.querySelector('.slider-btn_prev');
  const nextBtn = document.querySelector('.slider-btn_next');

  let currentSlide = 0;
  let isEnabled = true;

  const changeCurrentSlide = (n) => {
    currentSlide = (n + slides.length) % slides.length;
  };

  const hideSlide = (direction) => {
    isEnabled = false;
    slides[currentSlide].classList.add(direction);
    slides[currentSlide].addEventListener('animationend', function () {
      this.classList.remove('active', direction);
    });
  };

  const showSlide = (direction) => {
    slides[currentSlide].classList.add('next', direction);
    slides[currentSlide].addEventListener('animationend', function () {
      this.classList.remove('next', direction);
      this.classList.add('active');
      isEnabled = true;
    });
  };

  const showPrevSlide = (n) => {
    hideSlide('to-right');
    changeCurrentSlide(n - 1);
    showSlide('from-left');
  };

  const showNextSlide = (n) => {
    hideSlide('to-left');
    changeCurrentSlide(n + 1);
    showSlide('from-right');
  };

  prevBtn.addEventListener('click', () => {
    if (isEnabled) showPrevSlide(currentSlide);
  });

  nextBtn.addEventListener('click', () => {
    if (isEnabled) showNextSlide(currentSlide);
  });
};

// page-slider -------------------------------------

export const renderPageSlides = () => {
  const slider = document.querySelector('.page-slider');
  slider.innerHTML = '';
  const cardsOnPage = getCardsOnPage();
  const slides = generateSlides(cardsOnPage, 'page-slider');
  slider.append(...slides);
};

export const pageSliderPagination = () => {
  const slider = document.querySelector('.page-slider');
  const pagination = document.querySelector('.slider-pagination');

  const numBtn = pagination.querySelector('[data-gotoslide = "num"]');
  const nextBtn = pagination.querySelector('[data-gotoslide = "next"]');
  const prevBtn = pagination.querySelector('[data-gotoslide = "prev"]');
  const lastBtn = pagination.querySelector('[data-gotoslide = "last"]');
  const firstBtn = pagination.querySelector('[data-gotoslide = "first"]');

  const disableNextBtns = () => {
    nextBtn.setAttribute('disabled', true);
    lastBtn.setAttribute('disabled', true);
  };

  const disablePrevBtns = () => {
    prevBtn.setAttribute('disabled', true);
    firstBtn.setAttribute('disabled', true);
  };

  const enableNextBtns = () => {
    nextBtn.removeAttribute('disabled');
    lastBtn.removeAttribute('disabled');
  };

  const enablePrevBtns = () => {
    prevBtn.removeAttribute('disabled');
    firstBtn.removeAttribute('disabled');
  };

  pagination.addEventListener('click', (e) => {
    if (e.target.classList.contains('slider-btn')) {
      const activeSlide = slider.querySelector('.slide.active');
      activeSlide.classList.remove('active');

      if (e.target == numBtn) renderPageSlides();
      if (e.target == nextBtn) activeSlide.nextElementSibling.classList.add('active');
      if (e.target == prevBtn) activeSlide.previousElementSibling.classList.add('active');
      if (e.target == lastBtn) slider.lastElementChild.classList.add('active');
      if (e.target == firstBtn) slider.firstElementChild.classList.add('active');

      const newActiveSlide = slider.querySelector('.slide.active');

      if (newActiveSlide != slider.firstElementChild) {
        enablePrevBtns();
        enableNextBtns();
      }

      if (newActiveSlide == slider.lastElementChild) {
        disableNextBtns();
        enablePrevBtns();
      }

      if (newActiveSlide == slider.firstElementChild) {
        disablePrevBtns();
        enableNextBtns();
      }

      const slideIndex = Array.from(slider.children).findIndex((elem) => elem == newActiveSlide);
      numBtn.textContent = slideIndex + 1;
    }
  });
};
