export const burgerClickHandler = () => {
  const burger = document.querySelector('.burger');

  burger.addEventListener('click', () => {
    document.body.classList.toggle('menu-open');

    if (document.body.classList.contains('menu-open')) {
      document.body.addEventListener('click', closeMenu);
    } else {
      document.body.removeEventListener('click', closeMenu);
    }
  });

  const closeMenu = (e) => {
    if (
      (e.target.classList.contains('menu__link') && e.target.getAttribute('href').startsWith('#')) ||
      !e.target.closest('.header__menu')
    ) {
      document.body.classList.remove('menu-open');
    }
  };
};

// ---------------------------------------------

export const menuLinksClickHandler = () => {
  const menu = document.querySelector('.menu');

  menu.addEventListener('click', (e) => {
    if (e.target.classList.contains('menu__link') && e.target.getAttribute('href').startsWith('#')) {
      e.preventDefault();
      const link = e.target;
      changeActiveLink(link);
      scrolltoTarget(link);
    }
  });

  const changeActiveLink = (link) => {
    menu.querySelector('.menu__link.active').classList.remove('active');
    link.classList.add('active');
  };

  const scrolltoTarget = (link) => {
    const id = link.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    const headerHeight = 45;

    if (target) {
      const targetPosition = target.getBoundingClientRect().top;
      let offsetPosition;

      if (window.innerWidth >= 768) {
        offsetPosition = targetPosition + window.scrollY - headerHeight;
      } else {
        offsetPosition = targetPosition + window.scrollY;
      }

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };
};
