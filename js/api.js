
const BASE_URL = "https://api.opendota.com/api";

const getDotaHero = () => {

    return fetch(`${BASE_URL}/heroes`)
    .then((response) => {
        return response.json();
    }).then(heroesArray => {   
        return heroesArray;
    })
}

export { getDotaHero };