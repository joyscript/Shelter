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

const allPetsNodes = [];
data.forEach((pet) => allPetsNodes.push(generatePetCard(pet)));

// ------------------------------------

let array = [];
for (let i = 0; i < data.length; i++) {
  array.push(i);
}

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

let shuffledArr = shuffle(array.slice());
let randomIndexes = [];

const getRandomIndexes = (quantity) => {
  if (shuffledArr.length < quantity) {
    shuffledArr = shuffle(array.slice());

    randomIndexes.forEach((item) => {
      let ind = shuffledArr.indexOf(item);
      shuffledArr.splice(ind, 1);
    });
  }

  randomIndexes = shuffledArr.splice(0, quantity);
  return randomIndexes;
};

// -----------------------------------

export const renderPetsCards = () => {
  const cardsContainer = document.querySelector('.pets-cards');
  cardsContainer.innerHTML = '';

  getRandomIndexes(3);
  console.log(randomIndexes);
  randomIndexes.forEach((index) => {
    const petCard = allPetsNodes[index];
    cardsContainer.append(petCard);
  });
};

export const mainSliderHandler = () => {
  const arrowBtns = document.querySelectorAll('.main-slider .slider-btn');

  arrowBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      renderPetsCards();
    });
  });
};
