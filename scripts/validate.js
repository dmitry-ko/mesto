

function enableValidation(parameters) {
  const forms = Array.from(document.querySelectorAll(parameters.formSelector));
  forms.forEach(form => {
    setValidationEvents(form, parameters);
  });
}

function setValidationEvents(form, parameters) {
  const [inputs, submitButton] = getFormElements(form, parameters);
  toggleButtonState(inputs, submitButton, parameters);

  inputs.forEach(input => {
    input.addEventListener('input', () => {
      isValid(form, input, parameters);
      toggleButtonState(inputs, submitButton, parameters);
    });
  });

  form.addEventListener('reset', () => {
    inputs.forEach(input => hideInputError(form, input, parameters));
    deactivateButton(submitButton, parameters);
  });
}

function deactivateButton(button, parameters) {
  button.classList.add(parameters.inactiveButtonClass);
  button.setAttribute('disabled', true);
}

function activateButton(button, parameters) {
  button.removeAttribute('disabled')
  button.classList.remove(parameters.inactiveButtonClass);
}

function toggleButtonState(inputs, button, parameters) {
  if (hasInvalidInput(inputs)) {
    deactivateButton(button, parameters);
  } else {
    activateButton(button, parameters);
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

function getFormElements(form, parameters) {
  const inputs = Array.from(form.querySelectorAll(parameters.inputSelector));
  const submitButton = form.querySelector(parameters.submitButtonSelector);

  return [inputs, submitButton];
}

function validateForm(form, parameters) {
  const [inputs, submitButton] = getFormElements(form, parameters);
  toggleButtonState(inputs, submitButton, parameters);

  inputs.forEach(input => {
    isValid(form, input, parameters);
  });
}



