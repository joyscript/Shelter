export const mainSliderControls = () => {
  const slider = document.querySelector('.main-slider');
  const slides = slider.querySelectorAll('.slide');
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

  // swipe -------------------------------------

  const swipeSlides = (element) => {
    let surface = element;
    let startX = 0;
    let startY = 0;
    let distX = 0;
    let distY = 0;
    let startTime = 0;
    let elapsedTime = 0;

    const minDistX = 50;
    const maxDistY = 100;
    const maxTime = 300;

    surface.addEventListener('mousedown', function (e) {
      startX = e.pageX;
      startY = e.pageY;
      startTime = new Date().getTime();
      e.preventDefault();
    });

    surface.addEventListener('mouseup', function (e) {
      distX = e.pageX - startX;
      distY = e.pageY - startY;
      elapsedTime = new Date().getTime() - startTime;

      if (elapsedTime <= maxTime) {
        if (Math.abs(distX) >= minDistX && Math.abs(distY) <= maxDistY) {
          if (distX > 0) {
            if (isEnabled) {
              showPrevSlide(currentSlide);
            }
          } else {
            if (isEnabled) {
              showNextSlide(currentSlide);
            }
          }
        }
      }
      e.preventDefault();
    });

    surface.addEventListener('touchstart', function (e) {
      let touchObj = e.changedTouches[0];
      startX = touchObj.pageX;
      startY = touchObj.pageY;
      startTime = new Date().getTime();
      // e.preventDefault();
    });

    surface.addEventListener('touchmove', function (e) {
      // e.preventDefault();
    });

    surface.addEventListener('touchend', function (e) {
      let touchObj = e.changedTouches[0];
      distX = touchObj.pageX - startX;
      distY = touchObj.pageY - startY;
      elapsedTime = new Date().getTime() - startTime;

      if (elapsedTime <= maxTime) {
        if (Math.abs(distX) >= minDistX && Math.abs(distY) <= maxDistY) {
          if (distX > 0) {
            if (isEnabled) {
              showPrevSlide(currentSlide);
            }
          } else {
            if (isEnabled) {
              showNextSlide(currentSlide);
            }
          }
        }
      }
      // e.preventDefault();
    });
  };

  swipeSlides(slider);
};
