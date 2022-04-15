export const windowScrollHandler = () => {
  const header = document.querySelector('.header');

  const changeHeaderOnScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  changeHeaderOnScroll();
  window.addEventListener('scroll', changeHeaderOnScroll);
};
