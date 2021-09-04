const guideContainer = document.querySelector('.guide');
const guideBtn = guideContainer.querySelector('.guide__acc');
const guideTitle = guideContainer.querySelector('.guide__title');
const guideList = guideContainer.querySelector('.guide__list');

const contactsContainer = document.querySelector('.contacts');
const contactsBtn = contactsContainer.querySelector('.contacts__acc');
const contactsTitle = contactsContainer.querySelector('.contacts__title');
const contactsList = contactsContainer.querySelector('.contacts__list');

guideList.classList.add('list--closed');
contactsList.classList.add('list--closed');

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
};

guideTitle.addEventListener('click', () => {
  openAcc(guideBtn, guideList);
  closeAnotherAcc(contactsBtn, contactsList);
});

contactsTitle.addEventListener('click', () => {
  openAcc(contactsBtn, contactsList);
  closeAnotherAcc(guideBtn, guideList);
});
