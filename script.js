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

//for (let x = 0; x < 14; x++) {
//
//    Xarray[x] = [];
//
//    for (let y = 0; y < 14; y++) {
//        let temptile = { ...tile };
//        let tempVisualTile = document.createElement("li");
//        temptile.xcord = x;
//        temptile.ycord = y;
//        console.log(temptile);
//        Xarray[x].push(temptile);
//        tempVisualTile = temptile;
//        minesweepergrid.appendChild(tempVisualTile);
//    }
//}

// console.log(Xarray);

console.log(Math.random());

// for (x = 0; x < 14; x++) {
//     for (y = 0; y < 14; y++) {
//         if (Math.random() < 0.2) {
//             Xarray[x][y].isbomb = true;
//         }
//     }
// }

for (x = 0; x < 196; x++) {
    let tempVisualTile = document.createElement("li");
    tempVisualTile.textContent = x;
    minesweepergrid.appendChild(tempVisualTile);
}
