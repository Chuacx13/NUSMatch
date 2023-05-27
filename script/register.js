const loginLink = document.querySelector('.js-login-link');
loginLink.addEventListener('click', () => goToLogin());

const registerButton = document.querySelector('.js-register-button');
registerButton.addEventListener('click', () => addUser());

const goToLogin = () => {location.href = 'login.html'};

const initialUserList = [
    { username: 'user',
    email: 'user@test.com',
    password: 'testpassword' }
];

if (JSON.parse(localStorage.getItem('userList')).length === 0) {
    localStorage.setItem('userList', JSON.stringify(initialUserList));
}

const userList = JSON.parse(localStorage.getItem('userList'));

function checkExistingUsername(username) {
    for (let i = 0; i < userList.length; i++) {
        if (userList[i].username === username) {
            return true; 
        }
    }
    return false;
}

function checkExistingEmail(email) {
    for (let i = 0; i < userList.length; i++) {
        if (userList[i].email === email) {
            return true; 
        }
    }
    return false;
}

function addUser() {
    const username = document.querySelector('.js-username-input').value;
    const email = document.querySelector('.js-email-input').value;
    const password = document.querySelector('.js-password-input').value;
    const confirmPassword = document.querySelector('.js-confirm-password-input').value;
    if (checkExistingUsername(username)) {
        document.querySelector('.js-message').innerHTML = 'Username already exist :(';
    } else if (checkExistingEmail(email)) {
        document.querySelector('.js-message').innerHTML = 'You already have an account :)';
    } else if (confirmPassword === password) {
        const newUser = { username, email, password };
        userList.push(newUser);
        const updatedUserList = JSON.stringify(userList);
        localStorage.setItem('userList', updatedUserList);
        alert('Login Now and Start Connecting!');
        goToLogin();
    } else {
        document.querySelector('.js-message').innerHTML = 'Password doesn\'t match';
    }
}
  