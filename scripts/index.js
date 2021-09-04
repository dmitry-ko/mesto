import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

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
  inputSelector: '.form__input',
  submitButtonSelector: '.button_type_popup-submit',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

const forms = getFormsObject();
const cardTemplateSelector = '#card';

const cards = document.querySelector('.elements__grid');

const imagePopup = document.querySelector('.popup_theme_image');
let currentPopup;

function getFormsObject() {
  const forms = Array.from(document.querySelectorAll('.form'));
  const formsObject = {};
  forms.forEach(form => {
    const formValidator = new FormValidator(validationParameters, form);
    formsObject[formValidator.formName] = formValidator;
  });
  return formsObject;
}

function openImagePopup(link, name) {
  imagePopup.querySelector('.figure__image').src = link;
  imagePopup.querySelector('.figure__caption').textContent = name;
  setPopupOpened(imagePopup);
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
    forms['profile-edit'].validate();
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
    const cardElement = new Card(titleInput.value, linkInput.value, cardTemplateSelector, openImagePopup);
    cards.prepend(cardElement.createCard());
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

function enableValidation() {
  Object.values(forms).forEach(form => {
    form.enableValidation();
  });
}

initPopups();
enableValidation();
initialCards.forEach((card) => {
  const cardElement = new Card(card.name, card.link, cardTemplateSelector, openImagePopup);
  cards.append(cardElement.createCard());
});
