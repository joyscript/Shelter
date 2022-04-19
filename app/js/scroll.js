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
    if (window.scrollY > 20) header.classList.add('scrolled');
    setTimeout(() => header.classList.add('trans'), 0);
  };

  changeHeaderOnLoad();
  window.addEventListener('scroll', changeHeaderOnScroll);
};
