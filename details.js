const pageSearch = window.location.search;
const params = new URLSearchParams(pageSearch);
const id = params.get("id");
const entryNumber = id.padStart(4, "0");
const wrapperDetail = document.querySelector(".wrapper-detail");
const headerPokemonDetail = document.querySelector("#header__pokemon-detail");
const mainPokemonDetail = document.querySelector("#main__pokemon-detail");



const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
fetch(url)
    .then((respons) => respons.json())
    .then((data) => {
        showPokemonCard(data);
    })

function showPokemonCard(pokemonInfoData) {
    const { weight } = pokemonInfoData;

    const urlimage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
    const backgroundColorClass = `background-${pokemonInfoData.types[0].type.name}`;
    wrapperDetail.classList.add(backgroundColorClass);
    //header 
    const headerString = `
      <div class = "div__header_styling">
            <a class="back2-button" href="index.html"><img src="assets/back2-arrow.svg" alt=""></a>
            <h2>${pokemonInfoData.forms[0].name}</h2>
            <p>#${entryNumber}</p>
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
    const listItemsString = /*html*/`<ul> ${pokemonInfoData.types.map((thislink) => `<li>${thislink.type.name}</li>`).join("")}</ul>`
    console.log(listItemsString);

    mainPokemonDetail.insertAdjacentHTML("beforeend", mainString);

    // mainPokemonDetail.insertAdjacentHTML("beforeend", aboutString);
    console.log(pokemonInfoData.types);
    pokemonInfoData.types.map((element) => {
        `<li>${element.type.name}</li>`
    })

    const aboutInfoString = /*html*/`

 <article class ="about_article"> 
        <div class ="pil_wrapper">
           <p class ="pil background-${pokemonInfoData.types[0].type.name}">${pokemonInfoData.types[0].type.name}</p>
           <p class ="pil background-${pokemonInfoData.types[1].type.name}">${pokemonInfoData.types[1].type.name}</p>
  

        </div>
            <h2>About </h2>
            <section class ="section__about">
                <div>
              <figure class ="flex-display">
                    <img src="assets/weight.svg" alt="Weight">
                    <figcaption>
                        <p>${pokemonInfoData.weight / 10} kg</p>
                    </figcaption>
                    </figure>
                    <h3>Weight</h3>
                </div>
                 <div >
                 <figure class ="flex-display">
                    <img src="assets/straighten.svg" alt="straighten">
                    <figcaption>
                    <p>${pokemonInfoData.height / 10} m</p>
                    </figcaption>
                    </figure>
                    <h3>Height</h3>

        </div>
         <div>
        <ul class ="ul__abilities">
        ${pokemonInfoData.abilities.map((item) => {
        return `<li>${item.ability.name}</li>`
    }).join("")}</ul>
        <h3>Moves</h3>
        </div>
    </section>
    
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, quia ex nostrum esse iure illum quisquam
                incidunt eaque sed architecto similique voluptatum ratione consequuntur deleniti minus perspiciatis sint
                aspernatur beatae!</p>
    
                 
    <table class="table__stats">${pokemonInfoData.stats.map(pokeStats => `<tr><th>${pokeStats.stat.name}</th><td><label for="">${pokeStats.base_stat}</label></td><td><progress value="${pokeStats.base_stat}" max="230"></progress></td></tr>`).join(" ")}</table> 
 </article>




     `

    mainPokemonDetail.insertAdjacentHTML("beforeend", aboutInfoString);
    // info

    // progress


    console.log(pokemonInfoData.types[0].type.name);
    /* const typeNameString = pokemonInfoData.types.map(element => {
        return element.type.name;
    }); */

    //pokemonInfoData.types.forEach(element => { <p class="pil"> ${element.type.name}</p> });



    // here progress

    /*    <table class="">${pokeDexInfo.stats.map(pokeStats => `<tr><th>${pokeStats.stat.name}</th><td><label for="">${pokeStats.base_stat}</label></td><td><progress value="${pokeStats.base_stat}" max="230"></progress></td></tr>`).join(" ")}</table>
            </progress> */

}
/* class ="background-${pokemonInfoData.types[0].type.name}" */

/* <figure class="gallery">
            <button class="gallery__right prev">&lt;</button>
            <img src="assets/Silhouette.png" alt="">
            <button class="gallery__left next">&gt;</button>
        </figure> 
        */