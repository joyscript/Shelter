export const handleMenu = () => {
  const menu = document.querySelector('.menu');
  const burger = document.querySelector('.burger');
  const overlay = document.querySelector('.overlay');

  const toggleMenu = () => document.body.classList.toggle('menu-open');
  const closeMenu = () => document.body.classList.remove('menu-open');

  burger.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', closeMenu);

  menu.addEventListener('click', (e) => {
    if (window.innerWidth >= 768 || !e.target.matches('.menu__link')) return;
    e.preventDefault();
    const href = e.target.getAttribute('href');

    if (href && href.startsWith('#')) document.getElementById(href.slice(1)).scrollIntoView();
    if (href && href.startsWith('.')) setTimeout(() => (window.location = href), 300);
    closeMenu();
  });
};
