export const windowScrollHandler = () => {
  const header = document.querySelector('.header');

  if (window.scrollY < 20) {
    header.classList.add('general');
  } else {
    header.classList.add('scrolled');
    setTimeout(() => header.classList.add('visible'), 100);
  }

  const changeHeaderOnScroll = () => {
    if (window.scrollY > 20) {
      header.classList.remove('general');
      header.classList.add('scrolled', 'visible');
    } else {
      header.classList.add('general');
      header.classList.remove('scrolled', 'visible');
    }
  };

  window.addEventListener('scroll', changeHeaderOnScroll);
};
