const popupForm = document.querySelector('.popup');
const closePopupBtn = popupForm.querySelector('.popup__close');
const popupName = popupForm.querySelector('#phone-popup');
const disabler = document.querySelector('.disabler');
const callBtn = document.querySelector('.header-top__contacts-call');
const body = document.querySelector('body');

const isEscEvent = function (evt) {
  return evt.key === ('Escape' || 'Esc');
};

const closePopUp = function(modal) {
  modal.classList.add('visually-hidden');
  disabler.classList.add('visually-hidden');
  body.classList.remove('body-lock');
};

const onPopUpEscKeydown = function (evt) {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closePopUp(popupForm);
  }
};

const popUpAction = function (evt) {
  evt.preventDefault();
  popupForm.classList.remove('visually-hidden');
  disabler.classList.remove('visually-hidden');
  body.classList.add('body-lock');
  popupName.focus();
  document.addEventListener('keydown', onPopUpEscKeydown);
  closePopupBtn.addEventListener('click', () => {
    closePopUp(popupForm);
  });

  disabler.addEventListener('click', () => {
    closePopUp(popupForm);
  });
};

callBtn.addEventListener('click', (evt) => {
  popUpAction(evt);
});
