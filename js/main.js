/*
Fetch Fundamentals
In this example we're going to generate random pictures of dogs.
1. Select the random dog button and add a click event
    listener on it.
2. Create the function get random dog with the fetch api.
    - documentation for the dog api here https://dog.ceo/dog-api/
    - explore and display what the promise returns.
3. Create a function that will select the image 
4. Call the get random dog function in your event listener,
    and call it when the page loads.
*/

// let randomDogButton = document.querySelector("#new-dog-button");

// randomDogButton.addEventListener("click", () => {
//     getRandomDog();
// });


// const getRandomDog = () => {
//     //Fetch the dog url. GET is the default
//     let dogURL = "https://dog.ceo/api/breeds/image/random";
//     fetch(dogURL)
//     .then((response) => {
//         return response.json();
        
//     })
//     .then((dogObject) => {
//         console.log(dogObject);
//         displayDogImage(dogObject.message);
//     });
//     //then get the json body from the response
//     //then display the dog image
// };

// const displayDogImage = (imageURL) => {
//     //get the dog image
//     let dogImageElement = document.querySelector(".dog-image");
//     //update the src attribute
//     dogImageElement.setAttribute("src", imageURL);
// };

// getRandomDog();

let herolist = [];

const getDotaHero = () => {
    let url = "https://api.opendota.com/api/heroes/";

    fetch(url)
    .then((response) => {
        return response.json();
    }).then(dotahero => {   
        //herolist = dotahero;
        sortHeroListAlphabetically(dotahero);
        pickAHero(dotahero)
    })
}

//this will sort heroes alphabetically
const sortHeroListAlphabetically = (heroesArray) => {
    heroesArray.sort((firstHeroName, secondHeroName) => {
        if (firstHeroName.localized_name < secondHeroName.localized_name) {
            return -1;
        }
    })
}

const pickAHero = (testherodetails) => {

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

getDotaHero();


//NO IMAGE FOR DAWN BREAKER ON THIS URL
//https://cdn.cloudflare.steamstatic.com/apps/dota2/images/heroes/${heroName}_full.png;