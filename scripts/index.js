let editBtn = document.querySelector('.button_type_profile-edit');
let popup = document.querySelector('.popup');

let nameProfile = document.querySelector('.profile__name');
let jobProfile = document.querySelector('.profile__about');

let formElement = document.querySelector('.form_theme_profile-edit');
let nameInput = formElement.querySelector('.form__input_theme_profile-edit[name=name]');
let jobInput = formElement.querySelector('.form__input_theme_profile-edit[name=about]');

let closeBtn = formElement.querySelector('.button_type_popup-close');


function openPopup() {
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
editBtn.addEventListener('click', openPopup);
