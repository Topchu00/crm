import LSkey from "./common/LSkey.js";

async function handleLoginClick (login, password) {
    try {
        const response = await fetch('../db/users.json', {method: 'GET'})
        const { data } = await response.json()

        const findedUser = data.find((user) => {
            return user.login === login && user.password === password
         })
         
        if(findedUser) {
            localStorage.setItem(LSkey.token, findedUser.id);
            window.location.replace('../pages/index.html');
        }
    } catch(error) {
        console.log(error);
        alert('Пользователь не найден')
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const login = document.getElementById('login');
    const password = document.getElementById('password');
    const submitBtn = document.getElementById('submit-btn');

    let loginValue = '';
    let passwordValue = '';

    login.addEventListener('input', (evt) => loginValue = evt.target.value)
    password.addEventListener('input', (evt) => passwordValue = evt.target.value)

    submitBtn.addEventListener('click', (evt) => {
        evt.preventDefault();
        
        if(loginValue.length < 3) {
            alert('Логин должнен быть больше 3 символов')
        }

        if(passwordValue.length < 3) {
            alert('Пароль должны быть больше 3 символов')
        }

        handleLoginClick(loginValue, passwordValue);
    })
})
