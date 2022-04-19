import { renderPageSlides } from './slides.js';
import { petsCardsClickHandler } from './popup.js';

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

      if (window.innerWidth < 1024) window.scrollTo({ top: 100, behavior: 'smooth' });
    }
  });

  petsCardsClickHandler(slider);
};
