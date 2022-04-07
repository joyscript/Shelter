const closeMenu = (e) => {
  if (e.target.classList.contains('menu__link') || (!e.target.closest('.menu') && !e.target.classList.contains('burger'))) {
    document.body.classList.remove('menu-open');
  }
};

document.body.addEventListener('click', (e) => {
  if (e.target.classList.contains('burger')) {
    document.body.classList.toggle('menu-open');
  }

  if (document.body.classList.contains('menu-open')) {
    document.body.addEventListener('click', closeMenu);
  } else {
    document.body.removeEventListener('click', closeMenu);
  }
});
