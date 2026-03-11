let currentOffset = 0;
let limit = 1350;
const mainDom = document.querySelector(".main-dom");
const artworkUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"


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



fetchpokemon();

