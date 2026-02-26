
let currentOffset = 0;
let limit = 20;
const mainDom = document.querySelector(".main-dom");

const artworkUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"



function fetchpokemon(offset) {
    fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`)
        .then((response) => response.json())
        .then((data) => {
            displayPokemon(data);
        })
}

function displayPokemon(data) {
    const results = data.results;
    const pokemonString = results
        .map((result) => {
            const { name, url } = result;
            const id = getIdFromPokemon(url)
            return /* html */`
            <article class ="pokemon-card">
                <p>#${id}</p>
                 <a href='details.html?id=${id}'><img src ="${artworkUrl}${id}.png" alt ="${name}">${name}</a>
                <h2>${name}</h2>
            </article>
        `;
        })
        .join('');

    mainDom.insertAdjacentHTML("beforeend", pokemonString);
    let observerPokemon = document.querySelector("main article:nth-last-child(5)");
    console.log(observerPokemon);

    observerPokemon.classList.add("red");
    observer.observe(observerPokemon);

}

function getIdFromPokemon(pokemonUrl) {
    return pokemonUrl.slice(0, -1).split("/").pop();
}

const observer = new IntersectionObserver((enteries) => {
    enteries.forEach((entry) => {
        if (entry.isIntersecting) {
            currentOffset = currentOffset + 20;

            if (currentOffset < 1330) {
                fetchpokemon(currentOffset);

            }
            else {
                console.log("END");

            }

        }
    })
}, {
    threshold: 1
})



fetchpokemon(currentOffset);

