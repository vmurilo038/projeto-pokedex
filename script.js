const URL = "https://pokeapi.co/api/v2/pokemon?limit=20";

let TODOSOSPOKEMONS = [];

const container = document.querySelector("#pokemon-container");

async function buscarPokemons() {
    try {
        const resposta = await fetch(URL);
        const dados = await resposta.json();
        const pokemons = dados.results;
        return pokemons;
    } catch (error) {
        console.error("Error na pesquisa dos pokemons:", error);
    }
}

async function buscarDetalhesPokemon(url) {
    try {
        const resposta = await fetch(url);
        const dados = await resposta.json();
        return dados;
    } catch (error) {
        console.error("Error na pesquisa dos detalhes do pokemon:", error);
    }}

   function criarCard(pokemon) {

    const card = document.createElement("div");

    card.classList.add("pokemon-card");

    card.innerHTML = `
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        
        <h2>${pokemon.name}</h2>
        
        <p>Tipo: ${pokemon.types[0].type.name}</p>
    `;

    container.appendChild(card);
}

async function carregarPokemons() {

    const pokemons = await buscarPokemons();

    for (const pokemon of pokemons) {

        const detalhes = await buscarDetalhesPokemon(pokemon.url);

        criarCard(detalhes);
    }
}

carregarPokemons();

buscarPokemons()