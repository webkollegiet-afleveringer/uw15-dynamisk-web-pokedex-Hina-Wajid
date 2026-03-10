// import { letter, number } from "./icons.js"
let currentOffset = 0;
let limit = 1350;
const mainDom = document.querySelector(".main-dom");
const artworkUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"

let searchMethod = "name"; // 1
let pokemons = [];
function fetchpokemon(offset) {
    fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`)
        .then((response) => response.json())
        .then((data) => {
            displayPokemon(data.results);
            pokemons = data.results;
        })
}

function displayPokemon(data) {

    const results = data;

    console.log(results);

    mainDom.innerHTML = "";
    const pokemonString = results
        .map((result) => {
            const { name, url } = result;
            const id = getIdFromPokemon(url)
            const entryNumber = id.padStart(4, "0");


            return /* html */`
            <a href='details.html?id=${id}'> 
            <article class ="pokemon-card">
             <div class="grey-bg"></div>
              <p data-id = ${id} >#${entryNumber}</p>
              <img src ="${artworkUrl}${id}.png" alt ="${name}">
              <h2 class ="first_letter_uppercase">${name}</h2>
              </article>
              
              </a>
              `
        })
        .join('');

    mainDom.insertAdjacentHTML("beforeend", pokemonString);

    const searchDom = document.querySelector("#search-pokemon");
    shiftSearchMethod(searchDom);  //2
    searchPokemon(searchDom);

}

fetchpokemon();

//shift method  //3
function shiftSearchMethod(searchDom) {
    const sortButtonDom = document.querySelector(".header__search_button");
    sortButtonDom.addEventListener("click", () => {
        //change between search method

        searchMethod = searchMethod === "name" ? "id" : "name"; //this statement is just like if below

        /*  if (searchMethod == "name") {
            searchMethod = "id"
        }
        else {
            searchMethod == "name"
        } */
        console.log(searchMethod);

        shiftSearchIcon(searchMethod, sortButtonDom);
    });
}

function shiftSearchIcon(searchMethod, sortButtonDom) {
    //vælg søge input elementet og nulstil teksten
    const inputDom = sortButtonDom.closest("header").querySe1ector("label input");
    inputDom.innerHTML = "";
    //skift søge ikon
    if (searchMethod === "id") {
        sortButtonDom.innerHTML = "";
        sortButtonDom.innerHTML = "tag";
    }
    else {
        sortButtonDom.innerHTML = "";
        sortButtonDom.innerHTML = "letter";

    }

}





//input 
function searchPokemon(searchDom) {
    removeEventListener("input", handelSearch)
    searchDom.addEventListener("input", handelSearch)
}

function handelSearch(event) {
    const inputValue = event.target.value.toLowerCase();
    console.log(inputValue);
    runSearch(inputValue);
}
//search 
function runSearch(inputValue) {
    const value = inputValue.trim();
    // console.log(value);

    if (!value) {
        console.log("search is empty");
        mainDom.innerHTML = "";
        displayPokemon(pokemons);
        return;
    }

    let pokemonSearchArray;
    pokemonSearchArray = searchByName(pokemons, value);

    console.log(pokemonSearchArray);

    displayPokemon(pokemonSearchArray);

}



// get ID fra url
function getIdFromPokemon(pokemonUrl) {
    return pokemonUrl.slice(0, -1).split("/").pop();
}
// FORMAT NUMBER: .HJÆLPER
function formatPokemonNumber(id) {

    return "#" + String(id).padStart(3, "0");

}

function searchByName(pokemonsArray, letter) {

    return pokemonsArray.filter((pokemon) =>
        pokemon.name.includes(letter.toLowerCase()));
}




