import LSkey from "./common/LSkey.js";

document.body.classList.add('dark');

export const checkUserAuth = () => {
    const token = localStorage.getItem(LSkey.token); 
    if(token) return;
    else {
        window.location.replace('../pages/login.html');
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const burger = document.getElementById('menu')
    const burgerActive = document.getElementById('menu-active')

    burger.addEventListener('click', () => {
        burger.classList.add('active')
    })

    burgerActive.addEventListener('click', () => {
        burger.classList.remove('active')
    })
})