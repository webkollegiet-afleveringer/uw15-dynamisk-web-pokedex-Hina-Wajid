const pageSearch = window.location.search;
const params = new URLSearchParams(pageSearch);
const id = params.get("id");


const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
fetch(url)
    .then((respons) => respons.json())
    .then((data) => {
        console.log(data);




    })