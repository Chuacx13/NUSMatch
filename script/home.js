const loginButton = document.querySelector('.js-login-button');
loginButton.addEventListener('click', () => goToLogin());

const goToLogin = () => {location.href = 'login.html'};

const registerButton = document.querySelector('.js-register-button');
registerButton.addEventListener('click', () => goToRegister());

const goToRegister = () => {location.href = 'register.html'};
