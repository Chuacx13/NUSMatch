const registerLink = document.querySelector('.js-register-link');
registerLink.addEventListener('click', () => goToRegister());

const loginButton = document.querySelector('.js-login-button');
loginButton.addEventListener('click', () => loginToAccount());

const goToRegister = () => {location.href = 'register.html'};

const initialUserList = [
    { username: 'user',
    email: 'user@test.com',
    password: 'testpassword' }
];

localStorage.setItem('userList', JSON.stringify(initialUserList));

const userList = JSON.parse(localStorage.getItem('userList'));

function checkDetails(username, password) {
    for (let i = 0; i < userList.length; i++) {
        if ((userList[i].username === username || userList[i].email == username) && userList[i].password === password) {
            return true; 
        }
    }
    return false;
}

function loginToAccount() {
    const inputUsername = document.querySelector('.js-username-input').value;
    const inputPassword = document.querySelector('.js-password-input').value;
    if (inputUsername.trim() === '' || inputPassword.trim() === '') {
        return;
    }
    if (checkDetails(inputUsername, inputPassword)) {
        document.querySelector('.js-message').innerHTML = 'Success';
    } else {
        document.querySelector('.js-message').innerHTML = 'Failed';
    }
}
