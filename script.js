const URL = "https://pokeapi.co/api/v2/pokemon?limit=20";

let TODOSOSPOKEMONS = [];

const container = document.querySelector("#pokemon-container");

async function buscarPokemons() {

    try {

        TODOSOSPOKEMONS = [];

        container.innerHTML = "Carregando Pokémon...";

        const resposta = await fetch(URL);

        if (!resposta.ok) {
            throw new Error("Erro ao buscar os Pokémon");
        }

        const POKEMONS = await resposta.json();

        for (const pokemon of POKEMONS.results) {

            const respostaPokemon = await fetch(pokemon.url);

            if (!respostaPokemon.ok) {
                throw new Error("Erro ao buscar detalhes do Pokémon");
            }

            const POKEMONTESTE = await respostaPokemon.json();

            const POKEMONITEM = {
                id: POKEMONTESTE.id,
                name: POKEMONTESTE.name,
                img: POKEMONTESTE.sprites.front_default,
                tipo: POKEMONTESTE.types[0].type.name,
                altura: POKEMONTESTE.height,
                peso: POKEMONTESTE.weight
            };

            TODOSOSPOKEMONS.push(POKEMONITEM);
        }

        criarCards();

    } catch (erro) {

        console.error(erro);

        container.innerHTML = "Erro ao carregar Pokémon.";

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
                    #${String(pokemon.id).padStart(3, "0")}
                </div>

                <h2>
                    ${pokemon.name}
                </h2>

                <p>
                    Tipo: ${pokemon.tipo}
                </p>

                <p>
                    Altura: ${pokemon.altura}
                </p>

                <button class="know-more" data-index="${index}">
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

    const botoes = document.querySelectorAll(".know-more");

    botoes.forEach(botao => {

        botao.addEventListener("click", () => {

            const index = botao.dataset.index;

            const pokemon = TODOSOSPOKEMONS[index];

            alert(`
Nome: ${pokemon.name}
Tipo: ${pokemon.tipo}
Altura: ${pokemon.altura}
Peso: ${pokemon.peso}
            `);

        });

    });

}

buscarPokemons();