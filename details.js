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
const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
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





function showPokemonCard(pokemonInfoData) {
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

    // mainPokemonDetail.insertAdjacentHTML("beforeend", aboutString);
    const listItemsString = /*html*/`<ul> ${pokemonInfoData.types.map((thistype) => `<li>${thistype.type.name}</li>`).join("")}</ul>`
    console.log(listItemsString);
    console.log(pokemonInfoData.types);
    pokemonInfoData.types.map((element) => {
        `<li>${element.type.name}</li>`
    })
    /*  <div class ="pil_wrapper">
               <p class ="pil background-${pokemonInfoData.types[0].type.name}">${pokemonInfoData.types[0].type.name}</p>
               <p class ="pil background-${pokemonInfoData.types[1].type.name}">${pokemonInfoData.types[1].type.name}</p>
            </div> */
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
    <p class ="margin__top">${species}</p>
    
     <section class ="section__stats margin__top"> 
     <h2 class = "${text_color}">Base Stats</h2>             
        <table class="table__stats">${pokemonInfoData.stats.map(pokeStats => `<tr><th class ="${text_color}">${pokeStats.stat.name}</th><td><label for="">${pokeStats.base_stat}</label></td><td><progress value="${pokeStats.base_stat}" max="230"></progress></td></tr>`).join(" ")}</table> 
      </section>    
    </article>
     `

    mainPokemonDetail.insertAdjacentHTML("beforeend", aboutInfoString);
    // info

    // progress


    console.log(pokemonInfoData.types[0].type.name);

    // here progress

    /*    <table class="">${pokeDexInfo.stats.map(pokeStats => `<tr><th>${pokeStats.stat.name}</th><td><label for="">${pokeStats.base_stat}</label></td><td><progress value="${pokeStats.base_stat}" max="230"></progress></td></tr>`).join(" ")}</table>
            </progress> */

}
/* class ="background-${pokemonInfoData.types[0].type.name}" */

