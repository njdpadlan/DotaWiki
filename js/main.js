//Imports the API fetch requests
import { getDotaHero } from "./api.js";

let heroList = [];
let filteredHeroList = [];

let heroesFormElement = document.querySelector(".form-inline");
let herolistElement = document.querySelector(".hero-list");
let strFilter = document.querySelector(".btn-str");
let agiFilter = document.querySelector(".btn-agi");
let intFilter = document.querySelector(".btn-int");
let univFilter = document.querySelector(".btn-all");


getDotaHero().then((dotaheroesArray) => {
  sortHeroListAlphabetically(dotaheroesArray);
  renderHeroList(dotaheroesArray);
  heroList = dotaheroesArray;
});

//Sort heroes alphabetically
const sortHeroListAlphabetically = (heroesArray) => {
  heroesArray.sort((firstHeroName, secondHeroName) => {
    if (firstHeroName.localized_name < secondHeroName.localized_name) {
      return -1;
    }
  });
};

//renders all the heroes
const renderHeroList = (dotaheroes) => {

  herolistElement.innerHTML = "";

  dotaheroes.forEach((herodetails) => {
    //removes the "npc_dota_hero_" and gets the hero name
    let heroName = herodetails.name.replace("npc_dota_hero_", "");

    //URL from Cloudflare for hosting Dota 2 assets
    let imgURL = `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${heroName}.png`;

    let heroCards = `<div class="card">
        <img class="card-img-top" src="${imgURL}">
        <div class="card-body">
          <h5 class="card-title">${herodetails.localized_name}</h5>
        </div>
      </div>`;
    herolistElement.innerHTML += heroCards;
  });
};

//search a hero function
const searchHero = (heroSearch, heroList) => {
let lowercaseFilter = heroSearch.toLowerCase();

let filteredHeroes = heroList.filter(heroes => {
  return heroes.localized_name.toLowerCase().includes(lowercaseFilter)
})
return filteredHeroes;
}

//search a hero event listener
heroesFormElement.addEventListener("submit", (event) => {
  event.preventDefault();
 
  filteredHeroList = heroList

  let searchHeroElement = event.target.elements["search-hero"];

  if (searchHeroElement.value != "") {
    filteredHeroList = searchHero(searchHeroElement.value, filteredHeroList);
  }
  renderHeroList(filteredHeroList)
})

//sort heroes by STR
strFilter.addEventListener("click", () => {
  let strValue = strFilter.value
  filteredHeroList = heroList
  filteredHeroList = sortByATTR(strValue, filteredHeroList)
  renderHeroList(filteredHeroList)
})

//sort heroes by AGI
agiFilter.addEventListener("click", () => {
  let agiValue = agiFilter.value
  filteredHeroList = heroList
  filteredHeroList = sortByATTR(agiValue, filteredHeroList)
  renderHeroList(filteredHeroList)
})

//sort heroes by INT
intFilter.addEventListener("click", () => {
  let intValue = intFilter.value
  filteredHeroList = heroList
  filteredHeroList = sortByATTR(intValue, filteredHeroList)
  renderHeroList(filteredHeroList)
})

//sort heroes by UNIVERSAL
univFilter.addEventListener("click", () => {
  let univValue = univFilter.value
  filteredHeroList = heroList
  filteredHeroList = sortByATTR(univValue, filteredHeroList)
  renderHeroList(filteredHeroList)
})

//filters the list by ATTR (str, agi, int, all/universal)
const sortByATTR = (heroAttr, heroList) => {
  let attrHeroes = heroList.filter(hero => {
    return hero.primary_attr === heroAttr;
  })
  return attrHeroes
}


//NO IMAGE FOR DAWN BREAKER FOR THIS URL
//https://cdn.cloudflare.steamstatic.com/apps/dota2/images/heroes/${heroName}_full.png;
