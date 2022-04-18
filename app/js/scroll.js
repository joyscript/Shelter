export const windowScrollHandler = () => {
  const header = document.querySelector('.header');

  let prevScroll = window.scrollY;
  let currentScroll;

  const makeHeaderHidden = () => {
    currentScroll = window.scrollY;
    if (currentScroll > prevScroll) {
      header.classList.add('hidden');
    } else {
      header.classList.remove('hidden');
    }
    prevScroll = currentScroll;
  };

  const changeHeaderOnScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
      header.classList.remove('general');
    } else {
      header.classList.remove('scrolled', 'hidden');
      header.classList.add('general');
    }

    if (window.scrollY > 250 && window.innerWidth < 768) makeHeaderHidden();
  };

  const changeHeaderOnLoad = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.add('general');
    }
  };

  changeHeaderOnLoad();
  window.addEventListener('scroll', changeHeaderOnScroll);
};
