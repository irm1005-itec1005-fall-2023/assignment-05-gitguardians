
let Xarray = [];


//minesweeper entities
let tile = {
 isbomb: false,
 isnearby: 0,
isrevealed: false,
 isflagged: false,
xcord: 0,
ycord: 0,

}

for (let x = 0; x <= 14; x++) {

 Xarray[x] = [];

    for (let y = 0; y <= 14; y++) {

        let temptile = tile;
        temptile.xcord = x;
        temptile.ycord = y;
        Xarray[x].push(temptile);
    }
}


