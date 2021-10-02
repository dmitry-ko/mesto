export default class FormValidator {

  constructor(parameters, formElement) {
    this._params = parameters;
    this._form = formElement;
    this.formName = formElement.getAttribute('name');
  }

  enableValidation = () => {
    this._inputs = this._getInputs();
    this._submitButton = this._getSubmitButton();
    this._toggleButtonState();

    this._inputs.forEach(input => {
      input.addEventListener('input', () => {
        this._inputHandler(input);
      });
    });

    this._form.addEventListener('reset', () => {
      this._resetHandler();
    });
  };

  validate = () => {
    this._toggleButtonState();

    this._inputs.forEach(input => {
      this._isValid(input);
    });
  };

  _inputHandler = input => {
    this._isValid(input);
    this._toggleButtonState();
  };

  _resetHandler = () => {
    this._inputs.forEach(input => this._hideInputError(input));
    this._deactivateButton();
  };

  _deactivateButton = () => {
    this._submitButton.classList.add(this._params.inactiveButtonClass);
    this._submitButton.setAttribute('disabled', true);
  };

  _activateButton = () => {
    this._submitButton.removeAttribute('disabled')
    this._submitButton.classList.remove(this._params.inactiveButtonClass);
  };

  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._deactivateButton();
    } else {
      this._activateButton();
    }
  };

  _hasInvalidInput = () => this._inputs.some(input => {
    return !input.validity.valid;
  });

  _isValid = input => {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  };

  _showInputError = (input, errorMessage) => {
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    input.classList.add(this._params.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._params.errorClass);
  };

  _hideInputError = input => {
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    input.classList.remove(this._params.inputErrorClass);
    errorElement.classList.remove(this._params.errorClass);
    errorElement.textContent = '';
  };

  _getInputs = () => Array.from(this._form.querySelectorAll(this._params.inputSelector));

  _getSubmitButton = () => this._form.querySelector(this._params.submitButtonSelector);
}
