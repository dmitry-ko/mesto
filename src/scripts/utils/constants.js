// export const initialCards = [
//   {
//     name: 'Архыз',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
//   },
//   {
//     name: 'Челябинская область',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
//   },
//   {
//     name: 'Иваново',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
//   },
//   {
//     name: 'Камчатка',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
//   },
//   {
//     name: 'Холмогорский район',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
//   },
//   {
//     name: 'Байкал',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
//   }
// ];

const inputSelector = '.form__input';
const submitButtonSelector = '.button_type_popup-submit';
const inactiveButtonClass = 'button_inactive';
const inputErrorClass = 'form__input_type_error';
const errorClass = 'form__input-error_active';
export const formSelector = '.form';
const imageSelector = '.figure__image';
const captionSelector = '.figure__caption';
const nameProfileSelector = '.profile__name';
const jobProfileSelector = '.profile__about';
const profileAvatarSelector = '.profile__avatar';
export const cardTemplateSelector = '#card';
export const apiParams = {cohort: 'cohort-28',
                          token: 'd93ad35a-40c0-49e6-a03e-6ca8ae7228d2'};

export const imagePopupSelectors = {imageSelector,
                                    captionSelector};

export const formPopupSelectors = {formSelector,
                                  inputSelector};

export const validationParameters = {inputSelector,
                                    submitButtonSelector,
                                    inactiveButtonClass,
                                    inputErrorClass,
                                    errorClass};

export const userInfoSelectors = { nameSelector: nameProfileSelector,
  jobSelector: jobProfileSelector,
  avatarSelector: profileAvatarSelector };

