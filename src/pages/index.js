import Card from "../scripts/component/Card.js";
import "./index.css";
import FormValidator from "../scripts/component/FormValidator.js";
import PopupWithForm from "../scripts/component/PopupWithForm.js";
import PopupWithImage from "../scripts/component/PopupWithImage.js";
import {initialCards,
        validationParameters,
        formPopupSelectors,
        imagePopupSelectors,
        formSelector,
        nameProfileSelector,
        jobProfileSelector,
        cardTemplateSelector} from '../scripts/utils/constants.js';
import UserInfo from "../scripts/component/UserInfo.js";
import Section from "../scripts/component/Section.js";


const formValidators = getFormsObject();
const cards = new Section({items: initialCards,
                                        renderer: createCard},
                                        '.elements__grid');

const imagePopup = new PopupWithImage('.popup_theme_image', imagePopupSelectors);
const userInfo = new UserInfo({nameSelector: nameProfileSelector,
                                                  jobSelector: jobProfileSelector});
const profilePopup = new PopupWithForm(
  '.popup_theme_profile-edit',
  (evt, { name, about }) => {
    evt.preventDefault();
    userInfo.setUserInfo({ name, about });
    profilePopup.close();},
  formPopupSelectors);

const editBtn = document.querySelector('.button_type_profile-edit');
editBtn.addEventListener('click', () => {
  profilePopup.open(userInfo.getUserInfo());
  formValidators['profile-edit'].validate();
});

const addCardPopup = new PopupWithForm(
  '.popup_theme_add-card',
  (evt,  { title, link }) => {
    evt.preventDefault();
    cards.addItem(createCard({name: title, link}));
    addCardPopup.close();
  },
  formPopupSelectors);
const addBtn = document.querySelector('.button_type_add-element');
addBtn.addEventListener('click', () => {
  addCardPopup.open();
});


function getFormsObject() {
  const forms = Array.from(document.querySelectorAll(formSelector));
  const formsObject = {};
  forms.forEach(form => {
    const formValidator = new FormValidator(validationParameters, form);
    formsObject[formValidator.formName] = formValidator;
  });
  return formsObject;
}

function enableValidation() {
  Object.values(formValidators).forEach(form => {
    form.enableValidation();
  });
}

function createCard({name, link}) {
  const cardElement = new Card(name, link, cardTemplateSelector, imagePopup.open);
  return cardElement.createCard();
}

enableValidation();
cards.renderItems();
