export const handleCardClick = () => {
  const sliderCards = document.querySelector('.slider__cards');
  const modal = document.querySelector('.modal');

  sliderCards.addEventListener('click', (e) => {
    if (e.target.closest('.card')) {
      document.body.classList.add('modal-open');
    }
  });

  modal.addEventListener('click', (e) => {
    if (e.target.matches('.modal__close-btn') || e.target === modal) {
      document.body.classList.remove('modal-open');
    }
  });
};
