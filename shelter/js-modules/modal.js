const generateModal = (pet) => {
  const modal = document.createElement('div');
  modal.className = 'modal';

  modal.innerHTML = `
    <div class="modal__dialog">
      <button class="modal__close-btn button button_modal icon_close"></button>
      <div class="modal__pic"><img src="${pet.img}" alt="Pet ${pet.name}" /></div>
      <div class="modal__content">
        <h2 class="modal__title">${pet.name}</h2>
        <h4 class="modal__subtitle">${pet.type} - ${pet.breed}</h4>
        <p class="modal__text">${pet.description}</p>
        <ul class="modal__list">
          <li class="modal__item"><b>Age: </b>${pet.age}</li>
          <li class="modal__item"><b>Inoculations: </b>${pet.inoculations}</li>
          <li class="modal__item"><b>Diseases: </b>${pet.diseases}</li>
          <li class="modal__item"><b>Parasites: </b>${pet.parasites}</li>
        </ul>
      </div>
    </div>
  `;

  modal.addEventListener('click', (e) => {
    if (e.target.matches('.modal__close-btn') || e.target === modal) closeModal(modal);
  });

  return modal;
};

const checkScrollBar = () => {
  const scrollBarWidth = window.innerWidth - document.body.clientWidth;
  if (scrollBarWidth) document.body.style.paddingRight = scrollBarWidth + 'px';
};

const openModal = (pet) => {
  document.body.append(generateModal(pet));
  setTimeout(() => document.body.classList.add(`modal-open`), 0);
  checkScrollBar();
};

const closeModal = (modal) => {
  document.body.style = '';
  document.body.classList.remove(`modal-open`);
  setTimeout(() => modal.remove(), 500);
};

export { openModal };
