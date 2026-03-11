

const mainDom = document.querySelector("main");
let baseUrl = "https://pokeapi.co/api/v2/pokemon";

// INDSÆT OG SKAB WRAPPER
mainDom.insertAdjacentHTML("beforeend", '<div id="pokemon-wrapper"><div class="pokemon-inner-wrapper"></div></div>');

// VÆLG INDRE WRAPPER
const pokemonWrapperDom = document.querySelector("#pokemon-wrapper .pokemon-inner-wrapper");

let pokemons = [];

async function init() {
    //hente alle
    const numberOfPokemons = 1350;
    const url = `${baseUrl}?limit =${numberOfPokemons}`;

    const res = await fetch(url);
    const data = await res.JSON();
    pokemons = data.results;

    renderHeader(letter);

    const searchDom = document.querySelector("#search");

    searchPokemon(searchDom);
}

function searchPokemon(searchDom) {
    searchDom.addEventListener("input", (event) => {
        const inputValue = event.target.value.toLowerCase();
        runSearch(inputValue);
    })
}

function runSearch(inputValue) {
    const value = inputValue.trim();
    if (!value) {
        pokemonWrapperDom.innerHTML = "";
        return;
    }

    let pokemonSearchArray;
    pokemonSearchArray = searchbyName(pokemons, value);



    displayPokemon(pokemonSearchArray);

}

function displayPokemon(data) {

    pokemonWrapperDom.innerHTML = "";

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
        `;
        })
        .join('');

    mainDom.insertAdjacentHTML("beforeend", pokemonString);
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

    return pokemonsArray.filter((pokemon) >
        pokemon.name.includes(letter.toLowerCase()));
}

/*  function renderHeader(letter){

 } */

init();