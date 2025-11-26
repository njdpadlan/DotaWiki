import { BASE_URL } from "./base.js";

export const getHeroes = () => {
    return fetch(`${BASE_URL}/heroStats`)
        .then(response => {
            return response.json();
        }).then(data => {
            return data;
        })
}

export const getHeroById = async (id) => {
  return await fetch("https://api.opendota.com/api/heroStats")
    .then(response => {
        return response.json();
    }).then(data => {
        return data.find(hero => hero.id === Number(id));
    })
};

export const getHeroLore = async (heroName) => {
    return fetch("https://raw.githubusercontent.com/odota/dotaconstants/master/build/hero_lore.json")
        .then(response => {
            return response.json();
        }).then(data => {
            return data[heroName];
        })
};
