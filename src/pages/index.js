import Card from "../scripts/component/Card.js";
import "./index.css";
import FormValidator from "../scripts/component/FormValidator.js";
import PopupWithForm from "../scripts/component/PopupWithForm.js";
import PopupWithImage from "../scripts/component/PopupWithImage.js";
import PopupConfirmDelete from "../scripts/component/PopupConfirmDelete.js";
import {validationParameters,
        formPopupSelectors,
        imagePopupSelectors,
        formSelector,
        userInfoSelectors,
        cardTemplateSelector,
        apiParams} from '../scripts/utils/constants.js';
import UserInfo from "../scripts/component/UserInfo.js";
import Section from "../scripts/component/Section.js";
import Api from "../scripts/component/Api.js";


const api = new Api(apiParams);
const formValidators = getFormsObject();

let cards;
const userInfo = new UserInfo(userInfoSelectors);
api.getMe()
  .then(data => {
    userInfo.setInfo(data);
    getCards();
  })
  .catch(err => console.log(err));


const confirmDeletePopup = new PopupConfirmDelete('.popup_theme_confirm-delete', formPopupSelectors);


function getCards() {
  api.getCards()
    .then(data => {
      cards = new Section({
          items: data,
          renderer: createCard
        },
        '.elements__grid');
      cards.renderItems();
    })
    .catch(err => console.log(err));
}




const imagePopup = new PopupWithImage('.popup_theme_image', imagePopupSelectors);

const profilePopup = new PopupWithForm(
  '.popup_theme_profile-edit',
  (evt, { name, about }) => {
    evt.preventDefault();
    profilePopup.setProcessingStatus(true);
    api.updateProfile({ name, about })
      .then(data => {
        userInfo.setTextFields(data);
        profilePopup.close();
      })
      .catch(err => console.log(err))
      .finally(() => {
        profilePopup.setProcessingStatus(false);
      })
    },
  formPopupSelectors);

const editBtn = document.querySelector('.button_type_profile-edit');

editBtn.addEventListener('click', () => {
  profilePopup.open(userInfo.getInfo());
  formValidators['profile-edit'].validate();
});


const editAvatarPopup = new PopupWithForm(
  '.popup_theme_avatar-edit',
  (evt, { avatar }) => {
    evt.preventDefault();
    editAvatarPopup.setProcessingStatus(true);
    api.updateAvatar({ avatar })
      .then(data => {
        userInfo.setAvatar(data);
        editAvatarPopup.close();
      })
      .catch(err => console.log(err))
      .finally(() => {
        editAvatarPopup.setProcessingStatus(false);

      })
  },
  formPopupSelectors);

const editAvatarBtn = document.querySelector('.profile__avatar-cover');

editAvatarBtn.addEventListener('click', () => {
  editAvatarPopup.open(userInfo.getInfo());
  formValidators['avatar-edit'].validate();
});

const addCardPopup = new PopupWithForm(
  '.popup_theme_add-card',
  (evt,  { title, link }) => {
    evt.preventDefault();
    addCardPopup.setProcessingStatus(true);
    api.addCard({name: title, link})
      .then(data => {
        cards.addItem(createCard(data));
        addCardPopup.close();
      })
      .catch(err => console.log(err))
      .finally(() => {
        addCardPopup.setProcessingStatus(false);
      })
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
    if (formValidator.formName === 'confirm-delete') return;
    formsObject[formValidator.formName] = formValidator;
  });
  return formsObject;
}

function enableValidation() {
  Object.values(formValidators).forEach(form => {
    form.enableValidation();
  });
}

function deleteCardHandler(cardElement) {
  confirmDeletePopup.open((evt) => {
    evt.preventDefault();
    api.deleteCard(cardElement.getCardId())
      .then(() => {
        cardElement.removeCard();
        confirmDeletePopup.close();
      })
      .catch(err => console.log(err));
  });
}

function likeCardHandler(cardElement) {
  api.likeCard(cardElement.getCardId(), !cardElement.isLiked())
    .then(data => {
      cardElement.setLiked(!cardElement.isLiked(), data.likes.length);
    })
    .catch(err => console.log(err));
}

function createCard(data) {
  const cardElement = new Card(data,
    cardTemplateSelector,
    {
      handleCardClick: imagePopup.open,
      isLiked: data.likes.find(user => user._id === userInfo.getUserId()),
      isDeletable: data.owner._id === userInfo.getUserId(),
      likesCount: data.likes.length,
      handleDeleteClick: deleteCardHandler,
      handleLikeClick: likeCardHandler
    });
  return cardElement.createCard();
}

enableValidation();
