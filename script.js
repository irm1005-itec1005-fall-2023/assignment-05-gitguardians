let Xarray = [];
let minesweepergrid = document.getElementById("minesweepergrid");
let flagmode = document.getElementById("flagbutton");
let generate = document.getElementById("restartbutton");
let test = document.getElementById("testing");
let endbox = document.getElementById("endsection");
let timerInterval = null;
let endscreentitle = document.getElementById("endscreentitle");
let timetext = document.getElementById("timetext");










let gameoverstate = false; 
let time = 0;
let timerOn = false;
let totalFlagged = 0;
let totalBombs = 0;
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
    gameoverstate = false;
    pauseTimer();
    time = 0;
    endbox.classList.remove("gameover");
    totalFlagged = 0;
    totalBombs = 0;
    minesweepergrid.innerHTML = "";
    console.log("Generating Board");
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
generateBombs();
}

generateBoard();

// Adds bombs to each array element with a 15% chance of being a bomb 

function generateBombs() {
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
                totalBombs++;
            }
        }
    }
    createVisualBoard();
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
                if (gameoverstate === false) {
                    handleTimer();
                    if (isFlagModeOn === false) {
                        if (Xarray[event.target.dataset.xcord][event.target.dataset.ycord].isbomb == true) {
                            tempButton.textContent = "X";
                            tempButton.id = "bomb";
                            Xarray[event.target.dataset.xcord][event.target.dataset.ycord].isclicked = true; 
                            endbox.classList.add("gameover");
                            endResult();
                        }
                        else {
                            tempButton.textContent = Xarray[event.target.dataset.xcord][event.target.dataset.ycord].isnearby;
                            Xarray[event.target.dataset.xcord][event.target.dataset.ycord].isclicked = true;
                            let zeroCheckXCoord = event.target.dataset.xcord;
                            let zeroCheckYCoord = event.target.dataset.ycord;
                        
                            tempButton.id = "clicked";
                            revealif0(zeroCheckXCoord, zeroCheckYCoord);
                        }
                    } else {
                        if (Xarray[event.target.dataset.xcord][event.target.dataset.ycord].isclicked == false) {
                            if (Xarray[event.target.dataset.xcord][event.target.dataset.ycord].flagged == false) {
                                Xarray[event.target.dataset.xcord][event.target.dataset.ycord].flagged = true;
                                tempButton.textContent = "F";
                                tempButton.id = "flagged";
                                totalFlagged++;
                            } else {
                                Xarray[event.target.dataset.xcord][event.target.dataset.ycord].flagged = false;
                                tempButton.textContent = "";
                                tempButton.id = "tile";
                                totalFlagged--;
                            }
                        }
                    }
                }
            });
            tempVisualTile.appendChild(tempButton);
            minesweepergrid.appendChild(tempVisualTile);
        }
    }
}

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
                tempButton.id = "clicked";
                revealif0(tempTopLeft[0], tempTopLeft[1]);
            }
        }
        if (tempTop[0] >= 0) {
            if (Xarray[tempTop[0]][tempTop[1]].isclicked === false) {
                let tempButton = document.querySelector(`button[data-xcord="${tempTop[0]}"][data-ycord="${tempTop[1]}"]`);
                tempButton.textContent = Xarray[tempTop[0]][tempTop[1]].isnearby;
                Xarray[tempTop[0]][tempTop[1]].isclicked = true;
                tempButton.id = "clicked";
                revealif0(tempTop[0], tempTop[1]);
            }
        }
        if (tempTopRight[0] >= 0 && tempTopRight[1] < 14) {
            if (Xarray[tempTopRight[0]][tempTopRight[1]].isclicked == false) {
                let tempButton = document.querySelector(`button[data-xcord="${tempTopRight[0]}"][data-ycord="${tempTopRight[1]}"]`);
                tempButton.textContent = Xarray[tempTopRight[0]][tempTopRight[1]].isnearby;
                Xarray[tempTopRight[0]][tempTopRight[1]].isclicked = true;
                tempButton.id = "clicked";
                revealif0(tempTopRight[0], tempTopRight[1]);
            }
        }
        if (tempRight[1] < 14) {
            if (Xarray[tempRight[0]][tempRight[1]].isclicked == false) {
                let tempButton = document.querySelector(`button[data-xcord="${tempRight[0]}"][data-ycord="${tempRight[1]}"]`);
                tempButton.textContent = Xarray[tempRight[0]][tempRight[1]].isnearby;
                Xarray[tempRight[0]][tempRight[1]].isclicked = true;
                tempButton.id = "clicked";
                revealif0(tempRight[0], tempRight[1]);
            }
        }
        if (tempBottomRight[0] < 14 && tempBottomRight[1] < 14) {
            if (Xarray[tempBottomRight[0]][tempBottomRight[1]].isclicked == false) {
                let tempButton = document.querySelector(`button[data-xcord="${tempBottomRight[0]}"][data-ycord="${tempBottomRight[1]}"]`);
                tempButton.textContent = Xarray[tempBottomRight[0]][tempBottomRight[1]].isnearby;
                Xarray[tempBottomRight[0]][tempBottomRight[1]].isclicked = true;
                tempButton.id = "clicked";
                revealif0(tempBottomRight[0], tempBottomRight[1]);
            }
        }
        if (tempBottom[0] < 14) {
            if (Xarray[tempBottom[0]][tempBottom[1]].isclicked == false) {
                let tempButton = document.querySelector(`button[data-xcord="${tempBottom[0]}"][data-ycord="${tempBottom[1]}"]`);
                tempButton.textContent = Xarray[tempBottom[0]][tempBottom[1]].isnearby;
                Xarray[tempBottom[0]][tempBottom[1]].isclicked = true;
                tempButton.id = "clicked";
                revealif0(tempBottom[0], tempBottom[1]);
            }
        }
        if (tempBottomLeft[0] < 14 && tempBottomLeft[1] >= 0) {
            if (Xarray[tempBottomLeft[0]][tempBottomLeft[1]].isclicked == false) {
                let tempButton = document.querySelector(`button[data-xcord="${tempBottomLeft[0]}"][data-ycord="${tempBottomLeft[1]}"]`);
                tempButton.textContent = Xarray[tempBottomLeft[0]][tempBottomLeft[1]].isnearby;
                Xarray[tempBottomLeft[0]][tempBottomLeft[1]].isclicked = true;
                tempButton.id = "clicked";
                revealif0(tempBottomLeft[0], tempBottomLeft[1]);
            }
        }
        if (tempLeft[1] >= 0) {
            if (Xarray[tempLeft[0]][tempLeft[1]].isclicked == false) {
                let tempButton = document.querySelector(`button[data-xcord="${tempLeft[0]}"][data-ycord="${tempLeft[1]}"]`);
                tempButton.textContent = Xarray[tempLeft[0]][tempLeft[1]].isnearby;
                Xarray[tempLeft[0]][tempLeft[1]].isclicked = true;
                tempButton.id = "clicked";
                revealif0(tempLeft[0], tempLeft[1]);
            }
        }
    }
}

function handleFlagMode(event) {
    event.preventDefault();
    if (isFlagModeOn === false) {
        isFlagModeOn = true;
flagmode.classList.add("flagmodeon");
    }
    else {
        isFlagModeOn = false;
flagmode.classList.remove("flagmodeon");
    }
};

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
                tempButton.id = "bomb";
            }
            else {
                let tempButton = document.querySelector(`button[data-xcord="${x}"][data-ycord="${y}"]`);
                tempButton.textContent = Xarray[x][y].isnearby;
                tempButton.id = "clicked";
            }
        }
    }
    gameoverstate = true;
    pauseTimer();
    endscreentitle.textContent = "Game Over!";
    timetext.textContent = "Time: " + time + " seconds ";
}

function handleWin() {
    if (totalFlagged === totalBombs) {
        let totalCorrectFlags = 0;
        for (x = 0; x < 14; x++) {
            for (y = 0; y < 14; y++) {
                if (Xarray[x][y].isbomb == true && Xarray[x][y].flagged == true) {
                    totalCorrectFlags++;
                }
            }
        }
        if (totalCorrectFlags === totalBombs) {
            gameoverstate = true;
            endbox.classList.add("gameover");
            endscreentitle.textContent = "You Win!";
            pauseTimer();
            timetext.textContent = "Time: " + time + " seconds ";
        }
    }
}
document.addEventListener("click", handleWin);

generate.addEventListener("click", generateBoard);

function handleTimer() {
    if (timerOn === false) {
        timerOn = true;
        let time = 0;
        timerInterval = setInterval(function() {
            time++;
            timer.textContent = time;
        }, 1000);
    }
}

function pauseTimer() {
    if (timerOn === true) {
        clearInterval(timerInterval);
        timerOn = false;
    }
}

test.addEventListener("click", pauseTimer);