
async function displayData() {
    //get the name from url 
    let detailsFromUrl = new URLSearchParams(window.location.search);
    const name = detailsFromUrl.get('name');
    // extra error handling
    if (!name) {
        document.getElementById('pokemonDetails').innerHTML = `<div class="alert alert-warning">No Pokemon name/ID.</div>`;
        return;
    }

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const pokemon = await response.json();
        document.getElementById('pokemonDetails').innerHTML = `
<div class="sidebar col-md-4 px-2">
<div class="card detail-card mb-5">
  <img src="${pokemon.sprites.front_default}" class="card-img-top logo poke-image mx-auto my-3" alt="Pokemon sprite image">
  <div class="card-body">
    <h5 class="card-title text-center">${pokemon.name.toUpperCase()}</h5>
  </div>
  <ul class="list-group list-group-flush text-center">
    <li class="list-group-item bg-light text-primary"><strong>ID:</strong> ${pokemon.id}</li>
    <li class="list-group-item text-success"><strong>Species:</strong> ${pokemon.species.name}</li>
    <li class="list-group-item bg-light text-danger"><strong>Height:</strong> ${pokemon.height}</li>
    <li class="list-group-item text-info"><strong>Weight:</strong> ${pokemon.weight}</li>
  </ul>
  <div class="card-body bg-light text-center">
    <button onclick="window.history.back()" class="btn btn-secondary mx-auto">Back to Search</button>
  </div>
</div>
        </div>
<div class="col col-md-8 px-2">
<div class="accordion mb-5" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        Abilities
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div class="accordion-body">${pokemon.abilities.map(a => a.ability.name).join(', ')}      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingTwo">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        Types
      </button>
    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
      <div class="accordion-body">${pokemon.types.map(t => t.type.name).join(', ')}      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingThree">
      <button class="accordion-button collapsed " type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        Stats
      </button>
    </h2>
    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
      <div class="accordion-body">${pokemon.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join(', ')}</div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingFour">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
        Moves
      </button>
    </h2>
    <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
      <div class="accordion-body">${pokemon.moves.map(m => m.move.name).join(', ')}</div>
    </div>
  </div>
</div></div>
        `;
    } //error handling
    catch (error) {
        document.getElementById('pokemonDetails').innerHTML = `<div class="alert alert-warning">Cannot access Pokemon: ${error.message}</div>`;
    }
}

const updateData = () => {
    displayData();
}

updateData();
//update the details page every 10 seconds
setInterval(updateData, 10000)
