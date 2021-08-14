const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cards = document.querySelector('.elements__grid');
const cardTemplate = document.querySelector('#card').content;
const imagePopup = document.querySelector('.popup_theme_image');

function createCard(name, link) {
  const card = cardTemplate.querySelector('.element').cloneNode(true);
  card.querySelector('.element-header').textContent = name;
  card.querySelector('.element__image').style.backgroundImage = `url(${link})`;
  card.querySelector('.element__image').addEventListener('click', () => {
    imagePopup.querySelector('.figure__image').src = link;
    imagePopup.querySelector('.figure__caption').textContent = name;
    openCurrentPopup(imagePopup);
  });

  card.querySelector('.element__like').addEventListener('click',
      evt => evt.target.classList.toggle('element__like_active'));

  card.querySelector('.button_type_delete-element').addEventListener('click', evt => {
    evt.target.closest('.element').remove();
  });

  return card;
}

function openCurrentPopup(elem) {
  elem.closest('.popup').classList.add('popup_opened');
}

function closeCurrentPopup(elem) {
  elem.closest('.popup').classList.remove('popup_opened');
}

function initImagePopup() {
  imagePopup.querySelector('.button_type_popup-close').addEventListener('click',
    evt => closeCurrentPopup(evt.target));

  imagePopup.style.transitionDuration = '0.3s';  // иначе opacity отрабатывает при загрузке страницы и попап виден
}

function initProfileEditPopup() {
  const editBtn = document.querySelector('.button_type_profile-edit');

  const popup = document.querySelector('.popup_theme_profile-edit');
  const nameProfile = document.querySelector('.profile__name');
  const jobProfile = document.querySelector('.profile__about');

  const formElement = popup.querySelector('.form');
  const nameInput = formElement.querySelector('.form__input[name=name]');
  const jobInput = formElement.querySelector('.form__input[name=about]');

  editBtn.addEventListener('click', () => {
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
    openCurrentPopup(popup);
  });

  formElement.addEventListener('submit', evt => {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    closeCurrentPopup(evt.target);
  });

  formElement.querySelector('.button_type_popup-close').addEventListener('click',
      evt => closeCurrentPopup(evt.target));

  popup.style.transitionDuration = '0.3s';  // иначе opacity отрабатывает при загрузке страницы и попап виден
}

function initAddCardPopup() {
  const addBtn = document.querySelector('.button_type_add-element');

  const popup = document.querySelector('.popup_theme_add-card');
  const formElement = popup.querySelector('.form');
  const titleInput = formElement.querySelector('.form__input[name=title]');
  const linkInput = formElement.querySelector('.form__input[name=link]');

  addBtn.addEventListener('click', () => openCurrentPopup(popup));

  formElement.addEventListener('submit', evt => {
    evt.preventDefault();
    cards.prepend(createCard(titleInput.value, linkInput.value))
    formElement.reset();
    closeCurrentPopup(evt.target);
  });

  formElement.querySelector('.button_type_popup-close').addEventListener('click',
    evt => closeCurrentPopup(evt.target));

  popup.style.transitionDuration = '0.3s';  // иначе opacity отрабатывает при загрузке страницы и попап виден
}

initProfileEditPopup();
initAddCardPopup();
initImagePopup();
initialCards.forEach((card) => cards.append(createCard(card.name, card.link)));


