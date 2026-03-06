const pageSearch = window.location.search;
const params = new URLSearchParams(pageSearch);
const id = params.get("id");
const entryNumber = id.padStart(4, "0");
const wrapperDetail = document.querySelector(".wrapper-detail");
const headerPokemonDetail = document.querySelector("#header__pokemon-detail");
const mainPokemonDetail = document.querySelector("#main__pokemon-detail");

let species = "hej";

/* async function getData() {
    const [users, posts] = await Promise.all([
        fetch("/users").then(r => r.json()),
        fetch("/posts").then(r => r.json())
        ]);
        
        console.log(users, posts);
        } */

async function getData() {


    const [species, data] = await Promise.all([
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`).then(r => r.json()),
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`).then(response => response.json())
    ]);
    showPokemonCard(species, data);

}

/* fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((respons) => respons.json())
    .then((data) => {
        console.log(data.species.url);
        fetch(data.species.url)
            .then((respons) => respons.json())
            .then((data) => {

                species = data.flavor_text_entries.reduce((accumulator, currentValue) => {
                    console.log(currentValue.language.name);


                    if (currentValue.language.name == 'en') {
                        return accumulator + currentValue.flavor_text;
                    }
                }, "")
            })
        showPokemonCard(data);
    }) */
/* const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
fetch(url)
    .then((respons) => respons.json())
    .then((data) => {
        fetch(data.species.url)
            .then((respons) => respons.json())
            .then((data) => {
                console.log(data);

                species = data.flavor_text_entries.reduce((accumulator, currentValue) => {
                    console.log(currentValue.language.name);


                    if (currentValue.language.name == 'en') {
                        return accumulator + currentValue.flavor_text;
                    }
                }, "")
            })
        showPokemonCard(data);
    })
 */




function showPokemonCard(species, pokemonInfoData) {
    const { weight } = pokemonInfoData;
    const urlimage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
    const backgroundColorClass = `background-${pokemonInfoData.types[0].type.name}`;
    wrapperDetail.classList.add(backgroundColorClass);
    const text_color = `text_color-${pokemonInfoData.types[0].type.name}`


    //header 
    const headerString = /* html */`
      <div class = "div__header_styling">
            <a class="back2-button" href="index.html"><img src="assets/back2-arrow.svg" alt=""></a>
            <h2 class="text_color--white"> ${pokemonInfoData.forms[0].name}</h2>
            <p class="text_color--white">#${entryNumber}</p>
    </div>
`
    headerPokemonDetail.insertAdjacentHTML("afterbegin", headerString);


    /* Main  */
    /* hero image */
    const mainString =/*html*/ `
      
        <figure class="gallery">
            <div class="gallery__content">
                <button class="gallery__right prev">&lt;</button>
                <img src= "${urlimage}" alt="${pokemonInfoData.forms[0].name}">
                <button class="gallery__left next">&gt;</button>
            </div>
        </figure>          
`
    mainPokemonDetail.insertAdjacentHTML("beforeend", mainString);



    /* varibale that cleans the string for about */
    const cleaned = species.flavor_text_entries[9].flavor_text
        .replace(/[^\p{L}\p{N}.,\s]/gu, '')  // keep letters (incl. é), numbers, . , spaces
        .replace(/\s+/g, ' ')               // normalize whitespace
        .trim()
        .toLowerCase()
        .replace(/(^\p{L})|(\.\s+\p{L})/gu, match => match.toUpperCase());

    console.log(pokemonInfoData.stats);

    function statsname(name) {
        if (name == "hp") return "HP"
        if (name == "attack") return "ATK"
        if (name == "defense") return "DEF"
        if (name == "special-attack") return "SATK"
        if (name == "special-defense") return "SDEF"
        if (name == "speed") return "SPD"
        return name;
    }

    /* ABOUT ARTCILE */
    const aboutInfoString = /*html*/`
    <article class ="about_article"> 
        <div class ="pil_wrapper">
            ${pokemonInfoData.types.map((thistype) => `<p class ="pil background-${thistype.type.name}"> ${thistype.type.name}</p>`).join("")}
        </div>
        <section class ="section__about margin__top">  
            <h2 class = "${text_color}">About </h2>
            <section class ="flex-display section__inside_about">
                <div class ="card_inside">
                  <figure class ="flex-display">
                    <img src="assets/weight.svg" alt="Weight">
                    <figcaption>
                        <p>${pokemonInfoData.weight / 10} kg</p>
                    </figcaption>
                   </figure>
                    <h3>Weight</h3>
                </div>
                 <div class ="card_inside">
                 <figure class ="flex-display">
                    <img src="assets/straighten.svg" alt="straighten">
                    <figcaption>
                    <p>${pokemonInfoData.height / 10} m</p>
                    </figcaption>
                    </figure>
                    <h3>Height</h3>
        </div>
         <div class ="card_inside">
        <ul class ="ul__abilities">
        ${pokemonInfoData.abilities.map((item) => {
        return `<li>${item.ability.name}</li>`
    }).join("")}</ul>
        <h3>Moves</h3>
        </div>
    </section>
    </section>

    <p class ="margin__top about_text">${cleaned}</p>
    <section class ="section__stats margin__top"> 
     <h2 class = "${text_color}">Base Stats</h2>             
        <table class="table__stats">
        ${pokemonInfoData.stats.map(pokeStats =>

        `<tr><th class ="${text_color}">${statsname(pokeStats.stat.name)}</th><td><label for="">${pokeStats.base_stat}</label></td><td><div class= "progress_wrapper background-${pokemonInfoData.types[0].type.name}-light"  >
  <div class= "progress_bar background-${pokemonInfoData.types[0].type.name}" style ="width:${(pokeStats.base_stat / 230) * 100}%"></div>
</div></td></tr>`).join(" ")}</table> 
      </section>  

      
    </article>
     `
    mainPokemonDetail.insertAdjacentHTML("beforeend", aboutInfoString);
    // info

    // progress



    // here progress

    /*    <table class="">${pokeDexInfo.stats.map(pokeStats => `<tr><th>${pokeStats.stat.name}</th><td><label for="">${pokeStats.base_stat}</label></td><td><progress value="${pokeStats.base_stat}" max="230"></progress></td></tr>`).join(" ")}</table>
    </progress> */

}
/* class ="background-${pokemonInfoData.types[0].type.name}"
console.log(pokemonInfoData.types[0].type.name);
  console.log(pokemonInfoData.types);

    console.log(pokeStats.stat.name);
    console.log(cleaned);
    

    <p class ="margin__top">${species}</p> */

getData();

/* onclick = "nextPokemon()" */
/* function nextPokemon() {

    let temp = parseInt(id, 10) + 1;
    getData(temp)

} */