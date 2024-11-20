import { getDotaHero } from "./api.js";

let herolist = [];

getDotaHero().then(dotaheroesArray => {
    sortHeroListAlphabetically(dotaheroesArray);
    renderHeroList(dotaheroesArray)
})

//this will sort heroes alphabetically
const sortHeroListAlphabetically = (heroesArray) => {
    heroesArray.sort((firstHeroName, secondHeroName) => {
        if (firstHeroName.localized_name < secondHeroName.localized_name) {
            return -1;
        }
    })
}

const renderHeroList = (testherodetails) => {

    testherodetails.forEach(herodetails => {
    //removes the "npc_dota_hero_" and gets the hero name
    let heroName = herodetails.name.replace("npc_dota_hero_", "");
    //URL from Cloudflare for hosting Dota 2 assets
    let imgURL = `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${heroName}.png`;
    let herolistElement = document.querySelector(".hero-list")
    let herocards = `<div class="col">
        <div class="card shadow-sm">
          <img class="bd-placeholder-img card-img-top" src="${imgURL}"/>
          <div class="card-body">
            <h5 class="card-title">${herodetails.localized_name}</h5>
          </div>
        </div>
      </div>`  
      herolistElement.innerHTML += herocards; 
    })
}


//NO IMAGE FOR DAWN BREAKER FOR THIS URL
//https://cdn.cloudflare.steamstatic.com/apps/dota2/images/heroes/${heroName}_full.png;