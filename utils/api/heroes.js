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
  const res = await fetch("https://api.opendota.com/api/heroStats");
  const heroes = await res.json();
  return heroes.find(hero => hero.id === Number(id));
};
