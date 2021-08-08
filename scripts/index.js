let editBtn = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');

let formElement = document.querySelector('.popup__container');

let nameInput = formElement.querySelector('.popup__input[name=name]');
let jobInput = formElement.querySelector('.popup__input[name=about]');
let nameProfile = document.querySelector('.profile__name');
let jobProfile = document.querySelector('.profile__about');


function openPopup() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;

  popup.classList.toggle('popup_opened');
}

editBtn.addEventListener('click', openPopup);


let closeBtn = formElement.querySelector('.popup__button_type_close');

function closePopup(evt) {
  evt.preventDefault();

  popup.classList.toggle('popup_opened');
}

closeBtn.addEventListener('click', closePopup);


function formSubmitHandler (evt) {
  evt.preventDefault();

  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;

  popup.classList.toggle('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);
