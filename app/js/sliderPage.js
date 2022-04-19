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

  const scrollToTop = () => {
    if (window.innerWidth < 1024) {
      let top;
      let isPageOne = numBtn.textContent == 1;

      if (window.innerWidth >= 768) {
        top = isPageOne ? 120 : 260;
      } else if (window.innerWidth < 768 && window.innerWidth >= 480) {
        top = isPageOne ? 80 : 220;
      } else {
        top = isPageOne ? 80 : 200;
      }
      window.scrollTo({ top: top, behavior: 'smooth' });
    }
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

      const newActiveSlideIndex = Array.from(slider.children).findIndex((elem) => elem == newActiveSlide);
      numBtn.textContent = newActiveSlideIndex + 1;

      scrollToTop();
    }
  });

  petsCardsClickHandler(slider);
};
