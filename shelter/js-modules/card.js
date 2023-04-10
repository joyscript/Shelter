import { openPetModal } from './modal.js';

const generateCard = (pet) => {
  const card = document.createElement('div');
  card.className = 'card';

  card.innerHTML = `
    <div class="card__pic">
      <img src="${pet.img}" alt="Pet ${pet.name}" />
    </div>
    <div class="card__content">
      <h3 class="card__title">${pet.name}</h3>
      <button class="button" tabindex="-1">Learn more</button>
    </div>
  `;

  card.addEventListener('click', () => openPetModal(pet));

  return card;
};

export { generateCard };
