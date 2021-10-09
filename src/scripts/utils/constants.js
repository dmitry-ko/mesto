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
export const apiParams = {baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-28',
                          headers: {authorization: 'd93ad35a-40c0-49e6-a03e-6ca8ae7228d2',
                                    'Content-Type': 'application/json'}};

export const imagePopupSelectors = {imageSelector,
                                    captionSelector};

export const formPopupSelectors = {formSelector,
                                  inputSelector,
                                  submitButtonSelector};

export const validationParameters = {inputSelector,
                                    submitButtonSelector,
                                    inactiveButtonClass,
                                    inputErrorClass,
                                    errorClass};

export const userInfoSelectors = { nameSelector: nameProfileSelector,
  jobSelector: jobProfileSelector,
  avatarSelector: profileAvatarSelector };

