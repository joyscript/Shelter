import { generateModal, openModal } from './modal.js';

const showMessage = () => {
  const key = 'user-shelter-joyscript';

  if (!localStorage[key]) {
    const message = `
    <div class="modal__pic modal__pic_mes"><img src="../../assets/img/hello.gif" alt="Hello" /></div>
    <div class="modal__message">Для удобства проверки зайдите в&nbsp;консоль. Там&nbsp;показывается полезная&nbsp;информация.</div>
  `;

    openModal(generateModal(message));
    document.querySelector('.modal__close-btn').style.color = '#707070';
    localStorage.setItem(key, 'hello!');
  }
};

export { showMessage };
