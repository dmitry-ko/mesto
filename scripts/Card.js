export default class Card {
  constructor(name, link, templateSelector, openPopupFunc) {
    this._cardTemplate = document.querySelector(templateSelector).content;
    this._name = name;
    this._link = link;
    this._openPopupFunc = openPopupFunc;
  }
  createCard() {
    this._card = this._cardTemplate.querySelector('.element').cloneNode(true);
    this._card.querySelector('.element-header').textContent = this._name;
    this._card.querySelector('.element__image').style.backgroundImage = `url(${this._link})`;

    this._setEventListeners();

    return this._card;
  }

  _setEventListeners() {
    this._card.querySelector('.element__image').addEventListener('click', () => {
      this._openPopup();
    });

    this._card.querySelector('.element__like').addEventListener('click',
      evt => this._toggleLike(evt));

    this._card.querySelector('.button_type_delete-element').addEventListener('click', evt => {
      this._removeCard(evt);
    });
  }

  _removeCard(evt) {
    evt.target.closest('.element').remove();
  }

  _toggleLike(evt) {
    return evt.target.classList.toggle('element__like_active');
  }

  _openPopup() {
    this._openPopupFunc(this._link, this._name);
  }
}
