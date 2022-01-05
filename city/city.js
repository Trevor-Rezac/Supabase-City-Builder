import { checkAuth, logout } from '../fetch-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');
const skylineImgEl = document.getElementById('skyline-img');
const waterfrontImgEl = document.getElementById('waterfront-img');
const castleImgEl = document.getElementById('castle-img');
const skylineDropdown = document.getElementById('skyline-dropdown');
const waterfrontDropdown = document.getElementById('waterfront-dropdown');
const castleDropdown = document.getElementById('castle-dropdown');
const cityNameEl = document.getElementById('name-span');
const nameForm = document.querySelector('.name-form');
const sloganForm = document.querySelector('.slogan-form');
const sloganListEl = document.querySelector('.slogan-list');

// console.log(skylineImgEl, waterfrontImgEl, castleImgEl, skylineDropdown, waterfrontDropdown, castleDropdown, cityNameEl, sloganListEl, nameForm, sloganForm);

logoutButton.addEventListener('click', () => {
    logout();
});
