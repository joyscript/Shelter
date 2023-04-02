export const handleCardClick = () => {
  const sliderWindow = document.querySelector('.slider__wrapper');
  const modal = document.querySelector('.modal');

  sliderWrapper.addEventListener('click', (e) => {
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
