import './css/styles.css';
import { fetchCountries } from './api/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const seachCountry = document.querySelector('#search-box');
const elem = document.querySelector('.country-info')
const elemList = document.querySelector('.country-list')

seachCountry.addEventListener('input', debounce(getCountryData, DEBOUNCE_DELAY))

function getCountryData(event) {
    const countryName = event.target.value.trim();
    clearList(elem);
    clearList(elemList);
    if (!countryName) {
        return;
    }
    fetchCountries(countryName).then(data => {
        if (data.length === 1) {
            markupOneCountry(data[0]);
        } else if (data.length > 1 && data.length <= 10) {
            markupCountries(data)
        } else {
         Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
        }
}).catch(err => {
            Notiflix.Notify.failure('Oops, there is no country with that name')
});
}

function clearList(element) {
    element.innerHTML = '';
}

function markupOneCountry(countryData) {
    console.log(countryData.name.official);
    const { flags, capital, population, name, languages } = countryData;
    const language = Object.values(languages).join(', ');
    const { } = languages;

    elem.insertAdjacentHTML(
        'afterbegin', `<div style="display: flex; gap: 10px; margin-left: 20px; align-items: center"><img src='${flags.svg}' width='150px'/img>
            <span style="font-size: 30px; font-weight: 700">${name.official}</span></div>
            <ul style="list-style: none; font-size: 18px; line-height: 2"><li><span style="font-weight: 700">Capital: </span>${capital}</li>
            <li><span style="font-weight: 700">Population: </span>${population}</li>
            <li><span style="font-weight: 700">Language: </span>${language}</li></ul>`
    )
   
}
function markupCountries(countryData) {
    const cardsMarkUp = countryData.map(({ flags, name })=>`<div style="display: flex; gap: 10px; align-items: center; line-height: 2">
        <img src="${flags.svg}" width="40px">
        <span style="font-size: 18px; font-weight: 500">${name.official}</span></div>`).join('');
    elemList.insertAdjacentHTML('afterbegin', cardsMarkUp)
}
