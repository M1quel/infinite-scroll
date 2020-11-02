var template = document.querySelector("#pokeTemplate");
var allPokemons = document.querySelector(".allPokemons")
var clone = template.content.cloneNode(true);
let offset = 0

fetch ("https://pokeapi.co/api/v2/pokemon?offset=" + offset + "&limit=10")
.then(response => response.json())
.then(function(data) {
    let pokemons = data.results;

    pokemons.forEach(pokemon => {
        let clone = template.content.cloneNode(true);
        clone.querySelector(".pokemonHeading").innerText = pokemon.name;
        allPokemons.appendChild(clone)
    });
    pokemonAdder(pokemons)
})
function fetcher(offset) {
    fetch ("https://pokeapi.co/api/v2/pokemon?offset=" + offset + "&limit=10")
    .then(response => response.json())
    .then(function(data) {
        let pokemons = data.results;

        pokemons.forEach(pokemon => {
            let clone = template.content.cloneNode(true);
            clone.querySelector(".pokemonHeading").innerText = pokemon.name;
            allPokemons.appendChild(clone)
        });
        pokemonAdder(pokemons)
    })
}


let options = {
    threshold: [1.0]
}


var intObs = new IntersectionObserver(function(entries){
    var { target, intersectionRatio } = entries[0];
    if(entries[0].isIntersecting){
        offset = offset + 10;
        fetcher(offset);
    }
    


}, options);
function pokemonAdder(pokemons){
    let lastPokemon = document.querySelectorAll(".pokemonWrapper").length - 1;
    intObs.observe( document.querySelectorAll(".pokemonWrapper")[lastPokemon] );
}