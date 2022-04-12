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

// ----------------------------------------

const handlePopup = () => {
  const petsCards = document.querySelector('.pets-cards');
  const closeBtn = document.querySelector('.popup__close-btn');
  const overlay = document.querySelector('.overlay');
  const popup = document.querySelector('.popup__wrapper');

  const closePopup = (e) => {
    if (e.target == closeBtn || e.target == overlay) {
      document.body.classList.remove('popup-open');
      document.body.removeEventListener('click', closePopup);
    }
  };

  petsCards.addEventListener('click', (e) => {
    if (e.target.closest('.pet-card')) {
      document.body.classList.add('popup-open');
      document.body.addEventListener('click', closePopup);

      overlay.addEventListener('mouseover', (e) => {
        closeBtn.classList.add('active');
      });

      popup.addEventListener('mouseover', (e) => {
        closeBtn.classList.remove('active');
      });
    }
  });
};

handlePopup();
