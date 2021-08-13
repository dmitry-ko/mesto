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

let editBtn = document.querySelector('.button_type_profile-edit');
let popup = document.querySelector('.popup');

let nameProfile = document.querySelector('.profile__name');
let jobProfile = document.querySelector('.profile__about');

let formElement = popup.querySelector('.form_theme_profile-edit');
let nameInput = formElement.querySelector('.form__input_theme_profile-edit[name=name]');
let jobInput = formElement.querySelector('.form__input_theme_profile-edit[name=about]');

let closeBtn = formElement.querySelector('.button_type_popup-close');

const cards = document.querySelector('.elements__grid');
const cardTemplate = document.querySelector('#card').content;
const imagePopupTemplate = document.querySelector('#image-popup').content;

function createCard(name, link) {
  const card = cardTemplate.querySelector('.element').cloneNode(true);
  card.querySelector('.element-header').textContent = name;
  card.querySelector('.element__image').style.backgroundImage = `url(${link})`;
  card.querySelector('.element__image').addEventListener('click', () => {
    const imagePopup = imagePopupTemplate.querySelector('.popup').cloneNode(true);
    imagePopup.querySelector('.figure__image').src = link;
    imagePopup.querySelector('.figure__caption').textContent = name;

    imagePopup.querySelector('.button_type_popup-close').addEventListener('click',
      evt => {
        closeCurrentPopup(evt.target);
        evt.target.closest('.popup').remove();
      })

    document.querySelector('.page').append(imagePopup);
    openCurrentPopup(imagePopup);
  });

  card.querySelector('.element__like').addEventListener('click',
      evt => evt.target.classList.toggle('element__like_active'));

  return card;
}

function openCurrentPopup(elem) {
  elem.closest('.popup').classList.add('popup_opened');
}

function closeCurrentPopup(elem) {
  elem.closest('.popup').classList.remove('popup_opened');
}

function openPopupEdit() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  popup.classList.add('popup_opened');
}


function closePopup() {
  popup.classList.remove('popup_opened');
}


function formSubmitHandler (evt) {
  evt.preventDefault();

  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup();
}


formElement.addEventListener('submit', formSubmitHandler);
closeBtn.addEventListener('click', closePopup);
editBtn.addEventListener('click', openPopupEdit);


initialCards.forEach((card) => cards.append(createCard(card.name, card.link)));
