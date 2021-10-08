import Popup from "./Popup.js";

export default class PopupConfirmDelete extends Popup {
  constructor(popupSelector, formSelectors) {
    super(popupSelector);
    this._form = this._popup.querySelector(formSelectors.formSelector);
    this.setEventListeners();
  }

  open = (submitAction) => {
    this._changeSubmitAction(submitAction);
    super.open();
  };

  _changeSubmitAction(submitAction) {
    if (this._handleSubmit) this._form.removeEventListener('submit', this._handleSubmit);
    this._handleSubmit = submitAction;
    this._form.addEventListener('submit', this._handleSubmit);
  }
}
