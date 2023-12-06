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

function generateBoard() {

    Xarray = [];

    for (let x = 0; x < 14; x++) {

        Xarray[x] = [];

        for (let y = 0; y < 14; y++) {
            let temptile = { ...tile };
            temptile.xcord = x;
            temptile.ycord = y;
            console.log(temptile);
            Xarray[x].push(temptile);
        }
    }
}

generateBoard();

// Adds bombs to each array element with a 20% chance of being a bomb 
for (x = 0; x < 14; x++) {
    for (y = 0; y < 14; y++) {
        if (Math.random() < 0.15) {
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
function createVisualBoard() {
    for (x = 0; x < 14; x++) {
        for (y = 0; y < 14; y++) {
            let tempVisualTile = document.createElement("li");
            let tempButton = document.createElement("button");
            tempButton.id = "tile";
            tempButton.textContent = "";
            tempButton.dataset.xcord = x;
            tempButton.dataset.ycord = y;
            tempButton.addEventListener("click", function(event){
                if (isFlagModeOn === false) {
                    if (Xarray[event.target.dataset.xcord][event.target.dataset.ycord].isbomb == true) {
                        tempButton.textContent = "X";
                        tempButton.id = "bomb";
                        Xarray[event.target.dataset.xcord][event.target.dataset.ycord].isclicked = true;  
                        tempButton.style.color = "red";
                        endResult();
                    }
                    else {
                        tempButton.textContent = Xarray[event.target.dataset.xcord][event.target.dataset.ycord].isnearby;
                        Xarray[event.target.dataset.xcord][event.target.dataset.ycord].isclicked = true;
                        let zeroCheckXCoord = event.target.dataset.xcord;
                        let zeroCheckYCoord = event.target.dataset.ycord;
                        tempButton.style.color = "black";
                        tempButton.id = "clicked";
                        revealif0(zeroCheckXCoord, zeroCheckYCoord);
                    }
                } else {
                    if (Xarray[event.target.dataset.xcord][event.target.dataset.ycord].isclicked == false) {
                        if (Xarray[event.target.dataset.xcord][event.target.dataset.ycord].flagged == false) {
                            Xarray[event.target.dataset.xcord][event.target.dataset.ycord].flagged = true;
                            tempButton.textContent = "F";
                            tempButton.style.color = "yellow";
                            tempButton.id = "flagged";
                        } else {
                            Xarray[event.target.dataset.xcord][event.target.dataset.ycord].flagged = false;
                            tempButton.textContent = "";
                            tempButton.id = "tile";
                        }
                    }
                }
            });
            tempVisualTile.appendChild(tempButton);
            minesweepergrid.appendChild(tempVisualTile);
        }
    }
}

createVisualBoard();

document.addEventListener("keydown", handleFlagMode);

flagmode.addEventListener("click", handleFlagMode);

function revealif0(x, y) {
    if (Xarray[x][y].isnearby === 0) {
        let tempTopLeft = [parseInt(x) - 1, parseInt(y) - 1];
        let tempTop = [parseInt(x) - 1, parseInt(y)];
        let tempTopRight = [parseInt(x) - 1, parseInt(y) + 1];
        let tempRight = [parseInt(x), parseInt(y) + 1];
        let tempBottomRight = [parseInt(x) + 1, parseInt(y) + 1];
        let tempBottom = [parseInt(x) + 1, parseInt(y)];
        let tempBottomLeft = [parseInt(x) + 1, parseInt(y) - 1];
        let tempLeft = [parseInt(x), parseInt(y) - 1];
        if (tempTopLeft[0] >= 0 && tempTopLeft[1] >= 0) {
            if (Xarray[tempTopLeft[0]][tempTopLeft[1]].isclicked === false) {
                let tempButton = document.querySelector(`button[data-xcord="${tempTopLeft[0]}"][data-ycord="${tempTopLeft[1]}"]`);
                tempButton.textContent = Xarray[tempTopLeft[0]][tempTopLeft[1]].isnearby;
                Xarray[tempTopLeft[0]][tempTopLeft[1]].isclicked = true;
                revealif0(tempTopLeft[0], tempTopLeft[1]);
            }
        }
        if (tempTop[0] >= 0) {
            if (Xarray[tempTop[0]][tempTop[1]].isclicked === false) {
                let tempButton = document.querySelector(`button[data-xcord="${tempTop[0]}"][data-ycord="${tempTop[1]}"]`);
                tempButton.textContent = Xarray[tempTop[0]][tempTop[1]].isnearby;
                Xarray[tempTop[0]][tempTop[1]].isclicked = true;
                revealif0(tempTop[0], tempTop[1]);
            }
        }
        if (tempTopRight[0] >= 0 && tempTopRight[1] < 14) {
            if (Xarray[tempTopRight[0]][tempTopRight[1]].isclicked == false) {
                let tempButton = document.querySelector(`button[data-xcord="${tempTopRight[0]}"][data-ycord="${tempTopRight[1]}"]`);
                tempButton.textContent = Xarray[tempTopRight[0]][tempTopRight[1]].isnearby;
                Xarray[tempTopRight[0]][tempTopRight[1]].isclicked = true;
                revealif0(tempTopRight[0], tempTopRight[1]);
            }
        }
        if (tempRight[1] < 14) {
            if (Xarray[tempRight[0]][tempRight[1]].isclicked == false) {
                let tempButton = document.querySelector(`button[data-xcord="${tempRight[0]}"][data-ycord="${tempRight[1]}"]`);
                tempButton.textContent = Xarray[tempRight[0]][tempRight[1]].isnearby;
                Xarray[tempRight[0]][tempRight[1]].isclicked = true;
                revealif0(tempRight[0], tempRight[1]);
            }
        }
        if (tempBottomRight[0] < 14 && tempBottomRight[1] < 14) {
            if (Xarray[tempBottomRight[0]][tempBottomRight[1]].isclicked == false) {
                let tempButton = document.querySelector(`button[data-xcord="${tempBottomRight[0]}"][data-ycord="${tempBottomRight[1]}"]`);
                tempButton.textContent = Xarray[tempBottomRight[0]][tempBottomRight[1]].isnearby;
                Xarray[tempBottomRight[0]][tempBottomRight[1]].isclicked = true;
                revealif0(tempBottomRight[0], tempBottomRight[1]);
            }
        }
        if (tempBottom[0] < 14) {
            if (Xarray[tempBottom[0]][tempBottom[1]].isclicked == false) {
                let tempButton = document.querySelector(`button[data-xcord="${tempBottom[0]}"][data-ycord="${tempBottom[1]}"]`);
                tempButton.textContent = Xarray[tempBottom[0]][tempBottom[1]].isnearby;
                Xarray[tempBottom[0]][tempBottom[1]].isclicked = true;
                revealif0(tempBottom[0], tempBottom[1]);
            }
        }
        if (tempBottomLeft[0] < 14 && tempBottomLeft[1] >= 0) {
            if (Xarray[tempBottomLeft[0]][tempBottomLeft[1]].isclicked == false) {
                let tempButton = document.querySelector(`button[data-xcord="${tempBottomLeft[0]}"][data-ycord="${tempBottomLeft[1]}"]`);
                tempButton.textContent = Xarray[tempBottomLeft[0]][tempBottomLeft[1]].isnearby;
                Xarray[tempBottomLeft[0]][tempBottomLeft[1]].isclicked = true;
                revealif0(tempBottomLeft[0], tempBottomLeft[1]);
            }
        }
        if (tempLeft[1] >= 0) {
            if (Xarray[tempLeft[0]][tempLeft[1]].isclicked == false) {
                let tempButton = document.querySelector(`button[data-xcord="${tempLeft[0]}"][data-ycord="${tempLeft[1]}"]`);
                tempButton.textContent = Xarray[tempLeft[0]][tempLeft[1]].isnearby;
                Xarray[tempLeft[0]][tempLeft[1]].isclicked = true;
                revealif0(tempLeft[0], tempLeft[1]);
            }
        }
    }
}

function handleFlagMode(event) {
    event.preventDefault();
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

function endResult() {
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