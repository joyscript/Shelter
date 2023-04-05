export const handleMenu = () => {
  const menu = document.querySelector('.menu');
  const burger = document.querySelector('.burger');
  const overlay = document.querySelector('.overlay');

  const toggleMenu = () => document.body.classList.toggle('menu-open');
  const closeMenu = () => document.body.classList.remove('menu-open');

  burger.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', closeMenu);

  menu.addEventListener('click', (e) => {
    if (window.innerWidth >= 768 || !e.target.matches('.menu__link') || e.target.getAttribute('href').startsWith('.')) return;
    e.preventDefault();
    const id = e.target.getAttribute('href').slice(1);
    if (id) document.getElementById(id).scrollIntoView();
    closeMenu();
  });
};
