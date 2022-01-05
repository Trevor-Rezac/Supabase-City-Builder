import { checkAuth, createDefaultCity, getCity, logout, updateCityName, updateSkyline, updateWaterfront, updateCastle } from '../fetch-utils.js';

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

console.log(skylineImgEl, waterfrontImgEl, castleImgEl, skylineDropdown, waterfrontDropdown, castleDropdown, cityNameEl, sloganListEl, nameForm, sloganForm);

logoutButton.addEventListener('click', () => {
    logout();
});

window.addEventListener('load', async() => {
    //on load check to see if the user has a city
    //fetch the city from supabase
    const city = await getCity();
    // console.log(city);

    //if the user does not already have a city, create a new default city
    if (!city) {
        //create the default city
        const defaultCity = await createDefaultCity();
        console.log(defaultCity);

        //displays the default city by calling displayCity and passing the defaultCity as an argument.
        displayCity(defaultCity);

    } else {
        //if there already was a city, then just display that city by calling displayCity with the fetched city from supabase
        displayCity(city);
    }
});

nameForm.addEventListener('submit', async(e) => {
    e.preventDefault();

    const data = new FormData(nameForm);

    const name = data.get('name');

    const updatedCity = await updateCityName(name);

    displayCity(updatedCity);

    nameForm.reset();
});

skylineDropdown.addEventListener('change', async() => {
    const updatedSkyline = await updateSkyline(skylineDropdown.value);

    displayCity(updatedSkyline);
});

waterfrontDropdown.addEventListener('change', async() => {
    const updatedWaterfront = await updateWaterfront(waterfrontDropdown.value);

    displayCity(updatedWaterfront);
});

castleDropdown.addEventListener('change', async() => {
    const updatedCastle = await updateCastle(castleDropdown.value);

    displayCity(updatedCastle);
});

function displayCity(city) {
    
    //change the city name element to the city's name
    cityNameEl.textContent = `Welcome to ${city.name}!`;

    //change the img src of each option
    skylineImgEl.src = `../assets/skyline-${city.skyline}.jpeg`;
    waterfrontImgEl.src = `../assets/waterfront-${city.waterfront}.jpeg`;
    castleImgEl.src = `../assets/castle-${city.castle}.jpeg`;

    //then loop through the slogans array and display them the DOM
    //clear the DOM first, then render and append each slogan

}

