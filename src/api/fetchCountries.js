export const BASE_URL = 'https://restcountries.com/v3.1/name';

export const fetchCountries = url => {
    return fetch(`${BASE_URL}/${url}?fields=name,capital,population,flags,languages`)
        .then(responce => {
        if (!responce.ok) {
            throw new Error('No data loaded!');
        }
        return responce.json();
    })
};
