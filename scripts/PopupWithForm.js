import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit, formSelectors) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector(formSelectors.formSelector);
    this._inputs = Array.from(this._form.querySelectorAll(formSelectors.inputSelector));
    this.setEventListeners();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._handleSubmit.bind(this));
  }

  close() {
    super.close();
    this._form.reset();
  }

  _getInputValues() {
    return this._inputs.reduce((previous, current) => {
      previous[current.id] = current.value;
      return previous
    }, {});
  }
}
