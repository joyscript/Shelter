import { generateModal, openModal } from './modal.js';

const showMessage = () => {
  const message = `
    <p class="modal__message">Для удобства проверки зайдите в консоль.<br>
    Там показывается информация об исходном массиве и текущей странице.
    </p>
  `;

  const key = 'user-shelter-joyscript';
  if (!localStorage[key]) openModal(generateModal(message));
  localStorage.setItem(key, 'hello!');
};

export { showMessage };
