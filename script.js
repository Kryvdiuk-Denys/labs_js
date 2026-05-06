const tabs = document.querySelectorAll('.tab');
const forms = document.querySelectorAll('.form');
const successMessage = document.getElementById('successMessage');
const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');

const countries = {
  Україна: ['Київ', 'Львів', 'Одеса'],
  Польща: ['Варшава', 'Краків', 'Гданськ'],
  Німеччина: ['Берлін', 'Мюнхен', 'Гамбург']
};

const countrySelect = document.getElementById('country');
const citySelect = document.getElementById('city');

const setMessage = (text, success = true) => {
  successMessage.textContent = text;
  successMessage.style.color = success ? '#1e4620' : '#b71c1c';
};

const resetMessage = () => {
  successMessage.textContent = '';
};

const switchTab = tab => {
  tabs.forEach(button => {
    button.classList.toggle('active', button === tab);
    button.setAttribute('aria-selected', button === tab);
  });

  forms.forEach(form => form.classList.toggle('active', form.id === `${tab.dataset.tab}Form`));
  resetMessage();
};

tabs.forEach(tab => {
  tab.addEventListener('click', () => switchTab(tab));
});

const togglePassword = button => {
  const input = button.previousElementSibling;
  const isPassword = input.type === 'password';
  input.type = isPassword ? 'text' : 'password';
  button.setAttribute('aria-label', isPassword ? 'Приховати пароль' : 'Показати пароль');
};

document.querySelectorAll('.toggle').forEach(button => {
  button.addEventListener('click', () => togglePassword(button));
});

const createOption = (value, label) => {
  const option = document.createElement('option');
  option.value = value;
  option.textContent = label;
  return option;
};

Object.keys(countries).forEach(country => countrySelect.appendChild(createOption(country, country)));

countrySelect.addEventListener('change', () => {
  citySelect.innerHTML = '';

  if (countrySelect.value) {
    citySelect.appendChild(createOption('', 'Оберіть місто'));
    countries[countrySelect.value].forEach(city => citySelect.appendChild(createOption(city, city)));
    citySelect.disabled = false;
  } else {
    citySelect.appendChild(createOption('', 'Спершу оберіть країну'));
    citySelect.disabled = true;
  }
});

const setError = (input, message) => {
  const group = input.closest('.form-group');
  group.classList.add('error');
  group.classList.remove('success');
  const small = group.querySelector('small');
  if (small) small.textContent = message;
};

const setSuccess = input => {
  const group = input.closest('.form-group');
  group.classList.remove('error');
  group.classList.add('success');
  const small = group.querySelector('small');
  if (small) small.textContent = '';
};

const clearValidation = group => {
  group.classList.remove('error', 'success');
  const small = group.querySelector('small');
  if (small) small.textContent = '';
};

const isAtLeast = (value, min) => value.trim().length >= min;
const isWithinRange = (value, min, max) => value.trim().length >= min && value.trim().length <= max;
const isEmailValid = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const isPhoneValid = value => /^\+380\d{9}$/.test(value);

const calculateAge = dobValue => {
  const birth = new Date(dobValue);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age -= 1;
  }
  return age;
};

const validateRegistration = () => {
  let valid = true;
  const firstName = registerForm.firstName;
  const lastName = registerForm.lastName;
  const email = registerForm.email;
  const password = registerForm.password;
  const confirmPassword = registerForm.confirmPassword;
  const phone = registerForm.phone;
  const dob = registerForm.dob;
  const sex = registerForm.sex;
  const country = registerForm.country;
  const city = registerForm.city;

  if (!isWithinRange(firstName.value, 3, 15)) {
    setError(firstName, 'Ім’я має містити 3–15 символів');
    valid = false;
  } else {
    setSuccess(firstName);
  }

  if (!isWithinRange(lastName.value, 3, 15)) {
    setError(lastName, 'Прізвище має містити 3–15 символів');
    valid = false;
  } else {
    setSuccess(lastName);
  }

  if (!isEmailValid(email.value)) {
    setError(email, 'Введіть коректний email');
    valid = false;
  } else {
    setSuccess(email);
  }

  if (!isAtLeast(password.value, 6)) {
    setError(password, 'Пароль має бути не менше 6 символів');
    valid = false;
  } else {
    setSuccess(password);
  }

  if (!confirmPassword.value) {
    setError(confirmPassword, 'Підтвердження паролю є обов’язковим');
    valid = false;
  } else if (confirmPassword.value !== password.value) {
    setError(confirmPassword, 'Паролі мають співпадати');
    valid = false;
  } else {
    setSuccess(confirmPassword);
  }

  if (!isPhoneValid(phone.value)) {
    setError(phone, 'Телефон має формат +380XXXXXXXXX');
    valid = false;
  } else {
    setSuccess(phone);
  }

  if (!dob.value) {
    setError(dob, 'Оберіть дату народження');
    valid = false;
  } else {
    const dateValue = new Date(dob.value);
    const today = new Date();
    if (dateValue > today) {
      setError(dob, 'Дата не може бути у майбутньому');
      valid = false;
    } else if (calculateAge(dob.value) < 12) {
      setError(dob, 'Вам має бути не менше 12 років для реєстрації');
      valid = false;
    } else {
      setSuccess(dob);
    }
  }

  if (!sex.value) {
    setError(sex, 'Оберіть стать');
    valid = false;
  } else {
    setSuccess(sex);
  }

  if (!country.value) {
    setError(country, 'Оберіть країну');
    valid = false;
  } else {
    setSuccess(country);
  }

  if (!city.value) {
    setError(city, 'Оберіть місто');
    valid = false;
  } else {
    setSuccess(city);
  }

  return valid;
};

const validateLogin = () => {
  let valid = true;
  const username = loginForm.username;
  const password = loginForm.loginPassword;

  if (!username.value.trim()) {
    setError(username, 'Ім’я користувача не може бути порожнім');
    valid = false;
  } else {
    setSuccess(username);
  }

  if (!isAtLeast(password.value, 6)) {
    setError(password, 'Пароль має бути не менше 6 символів');
    valid = false;
  } else {
    setSuccess(password);
  }

  return valid;
};

registerForm.addEventListener('submit', event => {
  event.preventDefault();
  resetMessage();

  if (validateRegistration()) {
    setMessage('Успішна реєстрація! Раді вітати вас на платформі.');
    registerForm.reset();
    registerForm.querySelectorAll('.form-group').forEach(clearValidation);
    citySelect.disabled = true;
    citySelect.innerHTML = '';
    citySelect.appendChild(createOption('', 'Спершу оберіть країну'));
  }
});

loginForm.addEventListener('submit', event => {
  event.preventDefault();
  resetMessage();

  if (validateLogin()) {
    setMessage('Успішна авторизація! Вітаємо.');
    loginForm.reset();
    loginForm.querySelectorAll('.form-group').forEach(clearValidation);
  }
});

[registerForm, loginForm].forEach(form => {
  form.addEventListener('input', event => {
    const target = event.target;
    if (target.closest('.form-group')) {
      clearValidation(target.closest('.form-group'));
      resetMessage();
    }
  });
});

countrySelect.addEventListener('focus', () => resetMessage());
citySelect.addEventListener('focus', () => resetMessage());

if (!countrySelect.value) {
  citySelect.disabled = true;
  citySelect.innerHTML = '';
  citySelect.appendChild(createOption('', 'Спершу оберіть країну'));
}

