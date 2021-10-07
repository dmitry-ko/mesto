export default class Card {
  constructor({ name, link, _id },
              templateSelector,
              { handleCardClick, isLiked, isDeletable, likesCount, handleDeleteClick, handleLikeClick }) {
    this._cardTemplate = document.querySelector(templateSelector).content;
    this._name = name;
    this._link = link;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._isLiked = isLiked;
    this._isDeletable = isDeletable;
    this._likesCount = likesCount;
    this._id = _id;
    this._handleLikeClick = handleLikeClick;
  }
  createCard() {
    this._card = this._cardTemplate.querySelector('.element').cloneNode(true);
    this._card.querySelector('.element-header').textContent = this._name;
    this._image = this._card.querySelector('.element__image');
    this._image.style.backgroundImage = `url(${this._link})`;

    if (!this._isDeletable) this._card.querySelector('.button_type_delete-element').hidden = true;

    this._likeBotton = this._card.querySelector('.element__like');
    this._likesCounter = this._card.querySelector('.element__like-counter');
    if (this._isLiked) this.setLiked(true, this._likesCount);
    else this.setLiked(false, this._likesCount);


    this._setEventListeners();

    return this._card;
  }

  isLiked() {
    return this._isLiked;
  }

  setLiked(isLiked, likesCount) {
    if (isLiked) {
      this._likeBotton.classList.add('element__like_active');
      this._isLiked = true;
    }
    else {
      this._likeBotton.classList.remove('element__like_active');
      this._isLiked = false;
    }

    this._likesCounter.textContent = likesCount;
  }

  getCardId() {
    return this._id;
  }

  _setEventListeners() {
    this._image.addEventListener('click', () => {
      this._openPopup();
    });

    this._card.querySelector('.element__like').addEventListener('click',this._handleLikeClick.bind(this));

    this._card.querySelector('.button_type_delete-element').addEventListener('click',
      this._handleDeleteClick.bind(this));
  }

  removeCard() {
    this._card.closest('.element').remove();
  }

  _toggleLike(evt) {
    return evt.target.classList.toggle('element__like_active');
  }

  _openPopup() {
    this._handleCardClick({link: this._link,
                           name: this._name});
  }
}
