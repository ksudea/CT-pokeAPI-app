async function fetchPokemon() {
    const searchInput = document.getElementById('searchInput').value.trim().toLowerCase();
    // extra error handling
    if (!searchInput) {
        document.getElementById('pokemonDetails').innerHTML = `<div class="alert alert-warning">Enter Pokemon name or ID.</div>`;
        return;
    }

    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${searchInput}`
    try {
        const response = await fetch(apiUrl);
        const pokemon = await response.json();
        displayPokemon(pokemon);
    } //error handling
    catch (error) {
        document.getElementById('pokemonSummary').innerHTML = `<div class="alert alert-danger">Error fetching this Pokemon: ${error.message}. Make sure to enter a valid name or ID</div>`;
    }
}

function displayPokemon(pokemon) {
    const pokemonSummary = document.getElementById('pokemonSummary');
    pokemonSummary.className = 'card pokemon-card rounded-3 my-3';
    pokemonSummary.innerHTML = `
        <h2 class="card-header mt-2 bolder">${pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</h2>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name} image" class="logo poke-image mx-auto my-3">
        <ul class="list-group list-group-flush">
            <li class="list-group-item"><p>Abilities: ${pokemon.abilities.map(a => a.ability.name).join(', ')}</p></li>
            <li class="list-group-item"><p>Types: ${pokemon.types.map(t => t.type.name).join(', ')}</p></li>
        </ul>
        <a class="btn btn-secondary mt-3 mb-5" href="details.html?name=${pokemon.name}" style="width: 70%; margin-left: 15%;">Click here to see more details!</a> 
    `;
}

