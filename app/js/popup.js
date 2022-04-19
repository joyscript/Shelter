import { data } from './data.js';

class Popup {
  constructor() {
    this.overlay = '';
    this.popup = '';
    this.closeBtn = '';
  }

  buildPopup(content) {
    this.overlay = this.createDomNode(this.overlay, 'div', 'overlay');
    this.popup = this.createDomNode(this.popup, 'div', 'popup');
    this.closeBtn = this.createDomNode(this.closeBtn, 'button', 'popup__close-btn');

    this.setContent(content);
    this.appendPopupElements();
    this.addEventsHandlers();
    this.openPopup();
  }

  createDomNode(node, element, ...classes) {
    node = document.createElement(element);
    node.classList.add(...classes);
    return node;
  }

  setContent(content) {
    if (typeof content === 'string') {
      this.popup.innerHTML = content;
    } else {
      this.popup.innerHTML = '';
      this.popup.append(content);
    }
  }

  appendPopupElements() {
    this.popup.append(this.closeBtn);
    this.overlay.append(this.popup);
  }

  addEventsHandlers() {
    this.overlay.addEventListener('click', this.closePopup);
    this.overlay.addEventListener('pointerover', this.addHover);
    this.overlay.addEventListener('wheel', this.lockScroll);
    this.overlay.addEventListener('touchmove', this.lockScroll);
    this.popup.addEventListener('wheel', this.lockScroll);
    this.popup.addEventListener('touchmove', this.lockScroll);
  }

  openPopup() {
    document.body.append(this.overlay);
    setTimeout(() => this.overlay.classList.add('popup-open'), 0);
  }

  closePopup(e) {
    if (e.target.classList.contains('overlay') || e.target.classList.contains('popup__close-btn')) {
      document.querySelector('.overlay').classList.remove('popup-open');
      document.querySelector('.overlay').addEventListener('transitionend', function () {
        this.remove();
      });
      document.body.classList.remove('lock');
    }
  }

  addHover(e) {
    const closeBtn = document.querySelector('.popup__close-btn');
    if (e.target.classList.contains('overlay') || e.target.classList.contains('popup__close-btn')) {
      closeBtn.classList.add('active');
    } else {
      closeBtn.classList.remove('active');
    }
  }

  lockScroll(e) {
    if (e.target.classList.contains('overlay')) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (e.target.closest('.popup')) {
      const content = document.querySelector('.popup__content');
      if (content.scrollHeight <= content.offsetHeight) {
        e.preventDefault();
      } else {
        if (window.innerWidth == document.documentElement.offsetWidth) {
          document.body.classList.add('lock');
        }
      }
    }
  }
}

// -----------------------------------------------------------

class PetPopup extends Popup {
  constructor(pet) {
    super();
    this.pet = pet;
  }

  generateContent() {
    let template = `
    <div class="popup__wrapper">
      <div class="popup__image">
        <img src=${this.pet.img} alt="Pet ${this.pet.name}" />
      </div>

      <div class="popup__content">
        <h3 class="popup__title">${this.pet.name}</h3>
        <h4 class="popup__subtitle">${this.pet.type} - ${this.pet.breed}</h4>
        <p class="popup__text">${this.pet.description}</p>
        <ul class="popup__list">
          <li class="popup__item"><b">Age: </b><span>${this.pet.age}</span></li>
          <li class="popup__item"><b">Inoculations: </b><span>${this.pet.inoculations}</span></li>
          <li class="popup__item"><b">Diseases: </b><span>${this.pet.diseases}</span></li>
          <li class="popup__item"><b">Parasites: </b><span>${this.pet.parasites}</span></li>
        </ul>
      </div>
    </div>`;
    return template;
  }

  renderPopup() {
    let content = this.generateContent();
    super.buildPopup(content);
  }
}

// ------------------------------------

export const petsCardsClickHandler = (element) => {
  element.addEventListener('click', (e) => {
    if (e.target.closest('.pet-card')) {
      const curPetName = e.target.closest('.pet-card').dataset.pet;
      const curPetIndex = data.findIndex((pet) => pet.name == curPetName);
      const curPet = data[curPetIndex];

      renderCurrentPopup(curPet);
    }
  });
};

const renderCurrentPopup = (curPet) => {
  const curPetPopup = new PetPopup(curPet);
  curPetPopup.renderPopup();
};
