// Cache DOM elements
const contactName = document.getElementById('contact-name');
const contactEmail = document.getElementById('contact-email');
const contactPhone = document.getElementById('contact-phone');
const contactMessage = document.getElementById('contact-message');
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const phoneError = document.getElementById('phone-error');
const messageError = document.getElementById('message-error');
const submitBtn = document.getElementById('submit-btn');
const formSuccess = document.getElementById('form-success');

function showError(errorElement, message) {
  errorElement.textContent = message;
}

function clearError(errorElement) {
  errorElement.textContent = '';
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function isValidPhone(phone) {
  const re = /^\d{7,15}$/;
  return re.test(phone);
}

function validateAndSubmit() {
  let isValid = true;
  const nameVal = contactName.value.trim();
  const emailVal = contactEmail.value.trim();
  const phoneVal = contactPhone.value.trim();
  const messageVal = contactMessage.value.trim();

  if (nameVal === '') {
    showError(nameError, 'Full name is required.');
    isValid = false;
  } else {
    clearError(nameError);
  }

  if (emailVal === '') {
    showError(emailError, 'Email address is required.');
    isValid = false;
  } else if (!isValidEmail(emailVal)) {
    showError(emailError, 'Please enter a valid email address.');
    isValid = false;
  } else {
    clearError(emailError);
  }

  if (phoneVal === '') {
    showError(phoneError, 'Phone number is required.');
    isValid = false;
  } else if (!isValidPhone(phoneVal)) {
    showError(phoneError, 'Phone number must contain only digits (7 to 15 digits).');
    isValid = false;
  } else {
    clearError(phoneError);
  }

  if (messageVal === '') {
    showError(messageError, 'Message cannot be empty.');
    isValid = false;
  } else {
    clearError(messageError);
  }

  if (!isValid) return;

  contactName.value = '';
  contactEmail.value = '';
  contactPhone.value = '';
  contactMessage.value = '';
  formSuccess.textContent = 'Thank you for your message. Simon will get back to you shortly.';
  submitBtn.hidden = true;
}

contactName.addEventListener('input', () => clearError(nameError));
contactEmail.addEventListener('input', () => clearError(emailError));
contactPhone.addEventListener('input', () => clearError(phoneError));
contactMessage.addEventListener('input', () => clearError(messageError));
submitBtn.addEventListener('click', validateAndSubmit);
