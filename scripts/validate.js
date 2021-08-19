

function enableValidation(parameters) {
  const forms = Array.from(document.querySelectorAll(parameters.formSelector));
  forms.forEach(form => {
    setValidationEvents(form, parameters);
  });
}

function setValidationEvents(form, parameters) {
  const inputs = Array.from(form.querySelectorAll(parameters.inputSelector));
  const button = form.querySelector(parameters.submitButtonSelector);
  toggleButtonState(inputs, button, parameters);

  inputs.forEach(input => {
    input.addEventListener('input', () => {
      isValid(form, input, parameters);
      toggleButtonState(inputs, button, parameters);
    });
    input.addEventListener('change', () => {
      isValid(form, input, parameters);
      toggleButtonState(inputs, button, parameters);
    });
  });

  form.addEventListener('reset', () => {
    inputs.forEach(input => hideInputError(form, input, parameters));
    toggleButtonState(inputs, button, parameters);
  });
}

function toggleButtonState(inputs, button, parameters) {
  if (hasInvalidInput(inputs)) {
    button.classList.add(parameters.inactiveButtonClass);
    button.setAttribute('disabled', true)
  } else {
    button.removeAttribute('disabled')
    button.classList.remove(parameters.inactiveButtonClass);
  }
}

function hasInvalidInput(inputs) {
  return inputs.some(input => {
    return !input.validity.valid;
  })
}

function isValid(form, input, parameters) {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, parameters);
  } else {
    hideInputError(form, input, parameters);
  }
}

function showInputError(form, input, errorMessage, parameters) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.add(parameters.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(parameters.errorClass);
}

function hideInputError(form, input, parameters) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.remove(parameters.inputErrorClass);
  errorElement.classList.remove(parameters.errorClass);
  errorElement.textContent = '';
}


function validateForm(form, parameters) {
  const inputs = Array.from(form.querySelectorAll(parameters.inputSelector));
  const button = form.querySelector(parameters.submitButtonSelector);
  toggleButtonState(inputs, button, parameters);

  inputs.forEach(input => {
    isValid(form, input, parameters);
  });
}



