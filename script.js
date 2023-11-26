let Xarray = [];
let minesweepergrid = document.getElementById("minesweepergrid");

let tile = {
    isbomb: false,
    isnearby: 0,
    isrevealed: false,
    isflagged: false,
    xcord: 0,
    ycord: 0,
}

for (let x = 0; x < 14; x++) {

    Xarray[x] = [];

    for (let y = 0; y < 14; y++) {
        let temptile = { ...tile };
        let tempVisualTile = document.createElement("li");
        temptile.xcord = x;
        temptile.ycord = y;
        console.log(temptile);
        Xarray[x].push(temptile);
        tempVisualTile = temptile;
        minesweepergrid.appendChild(tempVisualTile);
    }
}

console.log(Xarray);

console.log(Math.random());

for (x = 0; x < 14; x++) {
    for (y = 0; y < 14; y++) {
        if (Math.random() < 0.2) {
            Xarray[x][y].isbomb = true;
        }
    }
}

let tempPokemon =
  `
  <li class="pokemon-list-item">
    <h3 class="pokemon-list-item-name">${pokemons[i].name}</h3>
    <p class="pokemon-list-item-level">Level: ${pokemons[i].level} </p>
    <p class="pokemon-list-item-type">Type: ${pokemons[i].type}</p>
  </li>
  `