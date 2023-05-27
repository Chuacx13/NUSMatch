const registerLink = document.querySelector('.js-register-link');
registerLink.addEventListener('click', () => goToRegister());

const goToRegister = () => {location.href = 'register.html'};