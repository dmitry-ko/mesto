import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit, formSelectors) {
    super(popupSelector);
    this._handleSubmitOuter = handleSubmit;
    this._form = this._popup.querySelector(formSelectors.formSelector);
    this._inputs = Array.from(this._form.querySelectorAll(formSelectors.inputSelector));
    this._submitButton = this._form.querySelector(formSelectors.submitButtonSelector);
    this.setEventListeners();
  }

  setEventListeners = () => {
    super.setEventListeners();
    this._form.addEventListener("submit", this._handleSubmit.bind(this));
  };

  _handleSubmit(evt) {
    this._handleSubmitOuter(evt, this._getInputValues())
  }

  close = () => {
    super.close();
    this._form.reset();
  };

  open = (inputValues) => {
    if (inputValues) {
      this._setInputValues(inputValues);
    }
    super.open();
  };

  setProcessingStatus = isInProcessing => {
    if (isInProcessing) this._submitButton.textContent = 'Сохранение...';
    else this._submitButton.textContent = 'Сохранить';
  };

  _setInputValues(inputValues) {
    this._inputs.forEach(input => {
      if (input.name in inputValues) {
        input.value = inputValues[input.name];
      }
    });
  }

  _getInputValues = () => this._inputs.reduce((previous, current) => {
    previous[current.id] = current.value;
    return previous
  }, {});
}
