const URL = "https://pokeapi.co/api/v2/pokemon?limit=20";

let TODOSOSPOKEMONS = [];

const container = document.querySelector("#pokemon-container");


async function buscarPokemons() {

    try {

        container.innerHTML = "Carregando Pokémon...";


        const resposta = await fetch(URL);


        if (!resposta.ok) {

            throw new Error("Erro ao buscar os Pokémon");

        }


     
        const POKEMONS = await resposta.json();


        console.log(POKEMONS);


        for (const pokemon of POKEMONS.results) {


           
            console.log(pokemon.url);


           
            const respostaPokemon =
                await fetch(pokemon.url);


            const POKEMONTESTE =
                await respostaPokemon.json();


            console.log(POKEMONTESTE);


            const POKEMONITEM = {

                name: POKEMONTESTE.name,

                img: POKEMONTESTE.sprites.front_default

            };


            TODOSOSPOKEMONS.push(POKEMONITEM);

        }


        console.log(TODOSOSPOKEMONS);


        criarCards();


    } catch (erro) {

        console.error(erro);

        container.innerHTML =
            "Erro ao carregar Pokémon.";

    }

}


function criarCards() {

    container.innerHTML = "";


    TODOSOSPOKEMONS.forEach((pokemon, index) => {


        const card = document.createElement("div");


        card.classList.add("pokemon-card");


        card.innerHTML = `

            <div class="pokemon-card-info">

                <div class="pokemon-number">
                    #${String(index + 1).padStart(3, "0")}
                </div>

                <h2>
                    ${pokemon.name}
                </h2>

                <p>
                    A strange seed was planted
                    on its back at birth.
                </p>

                <button class="know-more">
                    Know More
                </button>

            </div>


            <img
                src="${pokemon.img}"
                alt="${pokemon.name}"
            >

        `;


        container.appendChild(card);

    });

}


buscarPokemons();