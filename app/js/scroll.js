export const windowScrollHandler = () => {
  const header = document.querySelector('.header');

  const changeHeaderOnScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  const changeHeaderOnLoad = () => {
    header.classList.add('fixed');
    document.body.classList.add('lock');
    if (window.scrollY > 20) header.classList.add('scrolled');

    const unlockBody = () => {
      document.body.classList.remove('lock');
      header.classList.add('trans');
    };

    setTimeout(() => unlockBody(), 500);
  };

  changeHeaderOnLoad();
  window.addEventListener('scroll', changeHeaderOnScroll);
};
