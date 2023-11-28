let Xarray = [];
let minesweepergrid = document.getElementById("minesweepergrid");
let flagmode = document.getElementById("flagbutton");
let reveal = document.getElementById("revealbutton");
let generate = document.getElementById("generatebutton");

















let isFlagModeOn = false;

let tile = {
    isbomb: false,
    isnearby: 0,
    isrevealed: false,
    isflagged: false,
    xcord: 0,
    ycord: 0,
    flagged: false,
    isclicked: false,
}

for (let x = 0; x < 14; x++) {

    Xarray[x] = [];

    for (let y = 0; y < 14; y++) {
        let temptile = { ...tile };
        temptile.xcord = x;
        temptile.ycord = y;
        console.log(temptile);
        Xarray[x].push(temptile);
        tempVisualTile = temptile;
    }
}

// Adds bombs to each array element with a 20% chance of being a bomb 
for (x = 0; x < 14; x++) {
    for (y = 0; y < 14; y++) {
        if (Math.random() < 0.2) {
            Xarray[x][y].isbomb = true;
            let tempTopLeft = [x - 1, y - 1];
            let tempTop = [x - 1, y];
            let tempTopRight = [x - 1, y + 1];
            let tempRight = [x, y + 1];
            let tempBottomRight = [x + 1, y + 1];
            let tempBottom = [x + 1, y];
            let tempBottomLeft = [x + 1, y - 1];
            let tempLeft = [x, y - 1];
            
            if (tempTopLeft[0] >= 0 && tempTopLeft[1] >= 0) {
                Xarray[tempTopLeft[0]][tempTopLeft[1]].isnearby++;
            }
            if (tempTop[0] >= 0) {
                Xarray[tempTop[0]][tempTop[1]].isnearby++;
            }
            if (tempTopRight[0] >= 0 && tempTopRight[1] < 14) {
                Xarray[tempTopRight[0]][tempTopRight[1]].isnearby++;
            }
            if (tempRight[1] < 14) {
                Xarray[tempRight[0]][tempRight[1]].isnearby++;
            }
            if (tempBottomRight[0] < 14 && tempBottomRight[1] < 14) {
                Xarray[tempBottomRight[0]][tempBottomRight[1]].isnearby++;
            }
            if (tempBottom[0] < 14) {
                Xarray[tempBottom[0]][tempBottom[1]].isnearby++;
            }
            if (tempBottomLeft[0] < 14 && tempBottomLeft[1] >= 0) {
                Xarray[tempBottomLeft[0]][tempBottomLeft[1]].isnearby++;
            }
            if (tempLeft[1] >= 0) {
                Xarray[tempLeft[0]][tempLeft[1]].isnearby++;
            }
        }
    }
}

// This function creates an li and a button for each tile, also giving them the id of "tile". It then adds them to the list in the html file. The CSS displays them in a grid. 
for (x = 0; x < 14; x++) {
    for (y = 0; y < 14; y++) {
        let tempVisualTile = document.createElement("li");
        let tempButton = document.createElement("button");
        tempButton.id = "tile";
        tempButton.textContent = " ";
        tempButton.dataset.xcord = x;
        tempButton.dataset.ycord = y;
        tempButton.addEventListener("click", function(event){
            if (isFlagModeOn === false) {
                if (Xarray[event.target.dataset.xcord][event.target.dataset.ycord].isbomb == true) {
                    tempButton.textContent = "X";
                    console.log("this is bomb"); 
                    Xarray[event.target.dataset.xcord][event.target.dataset.ycord].isclicked = true;  
                }
                else {
                    tempButton.textContent = Xarray[event.target.dataset.xcord][event.target.dataset.ycord].isnearby;
                    console.log("NOT BOMB");
                    Xarray[event.target.dataset.xcord][event.target.dataset.ycord].isclicked = true;
                }
            } else {
                if (Xarray[event.target.dataset.xcord][event.target.dataset.ycord].isclicked == false) {
                    if (Xarray[event.target.dataset.xcord][event.target.dataset.ycord].flagged == false) {
                        Xarray[event.target.dataset.xcord][event.target.dataset.ycord].flagged = true;
                        tempButton.textContent = "F";
                    } else {
                        Xarray[event.target.dataset.xcord][event.target.dataset.ycord].flagged = false;
                        tempButton.textContent = " ";
                    }
                }
            }
        });
        tempVisualTile.appendChild(tempButton);
        minesweepergrid.appendChild(tempVisualTile);
    }
}

flagmode.addEventListener("click", handleFlagMode);

function handleFlagMode(event) {
    if (isFlagModeOn === false) {
        isFlagModeOn = true;
        flagmode.textContent = "Flag Mode: On";
    }
    else {
        isFlagModeOn = false;
        flagmode.textContent = "Flag Mode: Off";
    }
};

reveal.addEventListener("click", handleReveal);

function handleReveal(event) {
    for (x = 0; x < 14; x++) {
        for (y = 0; y < 14; y++) {
            if (Xarray[x][y].isbomb == true) {
                let tempButton = document.querySelector(`button[data-xcord="${x}"][data-ycord="${y}"]`);
                tempButton.textContent = "X";
            }
            else {
                let tempButton = document.querySelector(`button[data-xcord="${x}"][data-ycord="${y}"]`);
                tempButton.textContent = Xarray[x][y].isnearby;
            }
        }
    }
}