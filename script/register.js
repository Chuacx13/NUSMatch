const loginLink = document.querySelector('.js-login-link');
loginLink.addEventListener('click', () => goToLogin());

const goToLogin = () => {location.href = 'login.html'};