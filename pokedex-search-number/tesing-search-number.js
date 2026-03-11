import { tag, letter } from "./icons.js"
let currentOffset = 0;
let limit = 1350;
const mainDom = document.querySelector(".main-dom");
const wrapper = document.querySelector(".wrapper");

const artworkUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"

let searchMethod = "name";
let pokemons = [];
function fetchpokemon() {
    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}`)
        .then((response) => response.json())
        .then((data) => {
            renderHeader(letter);
            displayPokemon(data.results);
            pokemons = data.results;
            const searchDom = document.querySelector("#search-pokemon");
            shiftSearchMethod(searchDom);  //last changes 1
            searchPokemon(searchDom);

        })
}

function renderHeader(searchIcon) {
    const headerDom = document.querySelector(".header-styling");
    if (headerDom) {
        headerDom.remove();
    }
    const header = /* html */`
     <header class="header-styling">
    <div class="logo-container">
                <a href="index.html"><img src="./assets/pokeball_white.svg" alt="pokeball"></a>
                <h1>Pokédex</h1>
            </div>
            <form class="search-form" action="#">
                <div class="search-wrap">
                    <img src="./assets/search-icon.svg" alt="search-icon" class="search-icon">
                    <input type="search" name="search-pokemon" id="search-pokemon" placeholder="search">
                </div>
                <button type="button" class="header__search_button">${searchIcon}</button>
            </form>
    </header>
    `
    wrapper.insertAdjacentHTML("afterbegin", header);
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


}

fetchpokemon();

//shift method  //
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
        // runSearch(searchDom.value);
        searchPokemon(searchDom);
    });
}

function shiftSearchIcon(searchMethod, sortButtonDom) {
    //vælg søge input elementet og nulstil teksten
    // const inputDom = sortButtonDom.closest("header").querySe1ector("label input");
    const inputDom = sortButtonDom;
    inputDom.innerHTML = "";
    //skift søge ikon
    if (searchMethod === "id") {
        sortButtonDom.innerHTML = "";
        sortButtonDom.innerHTML = tag;
    }
    else {
        sortButtonDom.innerHTML = "";
        sortButtonDom.innerHTML = letter;

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
    //sorteret søge array

    let pokemonSearchArray;

    if (searchMethod === "name") {
        pokemonSearchArray = searchByName(pokemons, value);
    }
    else {
        pokemonSearchArray = searchById(pokemons, value);
    }
    console.log(pokemonSearchArray);

    displayPokemon(pokemonSearchArray);

    const searchformDom = document.querySelector(".search-form")
    searchformDom.addEventListener("submit", (event) => {
        event.preventDefault()
    })

}



// get ID fra url
function getIdFromPokemon(pokemonUrl) {
    return pokemonUrl.slice(0, -1).split("/").pop();
}
// FORMAT NUMBER: .HJÆLPER
function formatPokemonNumber(id) {

    return "#" + String(id).padStart(3, "0");

}
//search by name
function searchByName(pokemonsArray, letter) {

    return pokemonsArray.filter((pokemon) =>
        pokemon.name.includes(letter.toLowerCase()));
}
//Search by ID

function searchById(pokemonsArray, id) {
    id = Number(id);
    let searchResult = pokemonsArray.filter((pokemon, index) => {
        let pokemonUrlNumber = Number(getIdFromPokemon(pokemon.url))
        // let searchIndex;
        // searchIndex = index + 1;
        // if (pokemonUrlNumber == 10001) {
        //     id += 8975;
        // }
        return pokemonUrlNumber == id;
    })
    return searchResult;
}




