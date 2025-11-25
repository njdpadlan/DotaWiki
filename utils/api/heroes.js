import { BASE_URL } from "./base.js";

const getHeroes = () => {
    return fetch(`${BASE_URL}/heroStats`)
        .then(response => {
            return response.json();
        }).then(data => {
            return data;
        })
}

export { getHeroes };