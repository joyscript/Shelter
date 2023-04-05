import { generateModal } from './modal.js';

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

  card.addEventListener('click', () => {
    document.body.append(generateModal(pet));
    setTimeout(() => document.body.classList.add('modal-open'), 0);
  });

  return card;
};

export { generateCard };
