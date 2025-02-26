import { checkUserAuth } from "./global.js";
import LSkey from "./common/LSkey.js";

checkUserAuth();

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
  localStorage.removeItem(LSkey.token);
  window.location.replace('../pages/login.html'); 
});