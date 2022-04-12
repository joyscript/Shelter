const closeMenu = (e) => {
  if ((e.target.classList.contains('menu__link') && e.target.getAttribute('href').startsWith('#')) || !e.target.closest('.header__menu')) {
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

// -----------------------------------------

const changeHeader = () => {
  const header = document.querySelector('.header');

  const changeHeaderOnScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', changeHeaderOnScroll);
  window.addEventListener('load', changeHeaderOnScroll);
};

changeHeader();

// ----------------------------------------

const smoothScroll = () => {
  const links = document.querySelectorAll('.menu__link[href^="#"]');
  const headerHeight = 45;

  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      document.querySelector('.menu__link.active').classList.remove('active');
      link.classList.add('active');

      const id = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);

      if (target) {
        const targetPosition = target.getBoundingClientRect().top;
        const offsetPosition = targetPosition + window.scrollY - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    });
  });
};

smoothScroll();
