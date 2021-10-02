import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, imageSelectors) {
    super(popupSelector);
    this._img = this._popup.querySelector(imageSelectors.imageSelector);
    this._caption = this._popup.querySelector(imageSelectors.captionSelector);
    this.setEventListeners();
  }

  open = ({ link, name }) => {
    this._img.src = link;
    this._caption.textContent = name;
    super.open();
  };
}
