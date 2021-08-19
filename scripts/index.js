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
const validationParameters = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.button_type_popup-submit',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

const cards = document.querySelector('.elements__grid');
const cardTemplate = document.querySelector('#card').content;
const imagePopup = document.querySelector('.popup_theme_image');
let currentPopup;

function createCard(name, link) {
  const card = cardTemplate.querySelector('.element').cloneNode(true);
  card.querySelector('.element-header').textContent = name;
  card.querySelector('.element__image').style.backgroundImage = `url(${link})`;
  card.querySelector('.element__image').addEventListener('click', () => {
    imagePopup.querySelector('.figure__image').src = link;
    imagePopup.querySelector('.figure__caption').textContent = name;
    setPopupOpened(imagePopup);
  });

  card.querySelector('.element__like').addEventListener('click',
      evt => evt.target.classList.toggle('element__like_active'));

  card.querySelector('.button_type_delete-element').addEventListener('click', evt => {
    evt.target.closest('.element').remove();
  });

  return card;
}

function setPopupOpened(elem) {
  currentPopup = elem.closest('.popup');
  openCurrentPopup();
}

function openCurrentPopup() {
  currentPopup.classList.add('popup_opened');
  setEnclosureOnEsc(true);
}

function closeCurrentPopup() {
  currentPopup.classList.remove('popup_opened');
  setEnclosureOnEsc(false);
}

function initProfileEditPopup() {
  const editBtn = document.querySelector('.button_type_profile-edit');

  const profilePopup = document.querySelector('.popup_theme_profile-edit');
  const nameProfile = document.querySelector('.profile__name');
  const jobProfile = document.querySelector('.profile__about');

  const profileForm = profilePopup.querySelector('.form');
  const nameInput = profileForm.querySelector('.form__input[name=name]');
  const jobInput = profileForm.querySelector('.form__input[name=about]');

  editBtn.addEventListener('click', () => {
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
    validateForm(profileForm, validationParameters);
    setPopupOpened(profilePopup);
  });

  profileForm.addEventListener('submit', evt => {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    closeCurrentPopup();
  });
}

function initAddCardPopup() {
  const addBtn = document.querySelector('.button_type_add-element');

  const addCardPopup = document.querySelector('.popup_theme_add-card');
  const addCardForm = addCardPopup.querySelector('.form');
  const titleInput = addCardForm.querySelector('.form__input[name=title]');
  const linkInput = addCardForm.querySelector('.form__input[name=link]');

  addBtn.addEventListener('click', () => {
    addCardForm.reset();
    setPopupOpened(addCardPopup);
  });

  addCardForm.addEventListener('submit', evt => {
    evt.preventDefault();
    cards.prepend(createCard(titleInput.value, linkInput.value))
    closeCurrentPopup();
  });
}

function enablePopupsEnclosureEvents() {
  const popups = Array.from(document.querySelectorAll('.popup'));

  popups.forEach(popup => {
    popup.addEventListener('click', evt => {
      if (evt.target.classList.contains('popup_opened')) {
        closeCurrentPopup();
      }
      if (evt.target.classList.contains('button_type_popup-close')) {
        closeCurrentPopup();
      }
    });
  });
}

function setEnclosureOnEsc(enable) {
  if (enable) {
    document.addEventListener('keydown', closeOnEsc);
  }
  else {
    document.removeEventListener('keydown', closeOnEsc);
  }
}

function closeOnEsc(evt) {
  if (evt.key === 'Escape') closeCurrentPopup();
}

function setPopupsTransitionDurations() {
  const popups = Array.from(document.querySelectorAll('.popup'));
  popups.forEach(popup => {
    popup.style.transitionDuration = '0.3s';  // иначе opacity отрабатывает при загрузке страницы и попап виден
  });
}

function initPopups() {
  enablePopupsEnclosureEvents();
  initProfileEditPopup();
  initAddCardPopup();
  setPopupsTransitionDurations();
}


initPopups();
enableValidation(validationParameters);
initialCards.forEach((card) => cards.append(createCard(card.name, card.link)));
