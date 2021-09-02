//ACCORDION

const guideContainer = document.querySelector('.guide');
const guideBtn = guideContainer.querySelector('.guide__acc');
const guideTitle = guideContainer.querySelector('.guide__title');
const guideList = guideContainer.querySelector('.guide__list');

const contactsContainer = document.querySelector('.contacts');
const contactsBtn = contactsContainer.querySelector('.contacts__acc');
const contactsTitle = contactsContainer.querySelector('.contacts__title');
const contactsList = contactsContainer.querySelector('.contacts__list');

const closeAnotherAcc = (btn, listCl) => {
  if (btn.classList.contains('accordion--minus')) {
    btn.classList.toggle('accordion--plus');
    btn.classList.toggle('accordion--minus');
    listCl.classList.add('list--closed');
  }
};

const openAcc = (btn, listCl) => {
  btn.classList.toggle('accordion--plus');
  btn.classList.toggle('accordion--minus');
  listCl.classList.toggle('list--closed');
}

guideTitle.addEventListener('click', () => {
  openAcc(guideBtn, guideList)
  closeAnotherAcc(contactsBtn, contactsList);
});

contactsTitle.addEventListener('click', () => {
  openAcc(contactsBtn, contactsList);
  closeAnotherAcc(guideBtn, guideList);
});


//POPUP

const popupForm = document.querySelector('.popup');
const closePopupBtn = popupForm.querySelector('.popup__close');
const popupName = popupForm.querySelector('#name');
const disabler = document.querySelector('.disabler');
const callBtn = document.querySelector('.header-top__contacts-call');

const isEscEvent = function (evt) {
  return evt.key === ('Escape' || 'Esc');
};

const closePopUp = function(modal) {
  modal.classList.add('visually-hidden');
  disabler.classList.add('visually-hidden');
}

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
  popupName.focus();
  document.addEventListener('keydown', onPopUpEscKeydown);
  closePopupBtn.addEventListener('click', function () {
    closePopUp(popupForm);
  });
    
  disabler.addEventListener('click', function () {
    closePopUp(popupForm);
  });
}

callBtn.addEventListener('click', (evt) => {
  popUpAction(evt);
})

//VALIDITY

const element = document.querySelectorAll('#phone');
const maskOptions = {
  mask: '+{7}(000)000-00-00'
};

element.forEach((el) => {
  const mask = IMask(el, maskOptions);
});

//SCROLL

const smoothLinks = document.querySelectorAll('a[href^="#"]');
for (let smoothLink of smoothLinks) {
    smoothLink.addEventListener('click', function (e) {
        e.preventDefault();
        const id = smoothLink.getAttribute('href');

        document.querySelector(id).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
};
