let Xarray = [];
let minesweepergrid = document.getElementById("minesweepergrid");
let flagmode = document.getElementById("flagbutton");

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

aiuwefhiufafhuiawhfiahwuifhiuafwhuiawfkoji