let container = document.getElementById("minesweeper-container");
let textStatus = document.getElementById("minesweeper-text");
let counter = document.getElementById("minesweeper-counter");

let containerSize = 304;
let size = 16;

const NOT_GENERATED = 0;
const RUNNING = 1;
const LOSE = 2;
const WIN = 3;

let gameState = NOT_GENERATED;

container.style.width = containerSize + "px";
container.style.height = containerSize + "px";
let tilesWidth = Math.floor(containerSize / size);

container.style.gridTemplateColumns = "repeat(" + tilesWidth + ",16px)";
container.style.gridTemplateRows = "repeat(" + tilesWidth + ",16px)";

let grid = [];

let cheats = false;

let mineDensity = 0.2;
let mineAmt = Math.floor(mineDensity * tilesWidth * tilesWidth);
counter.innerText = mineAmt.toString();

// special value for representing a mine tile.
// all other values in the grid represent the amount of neighbouring mines
const MINE = 123;

const FLAG_CHAR = "⚑";

const DIRECTIONS = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1]
];

function resetGame() {
    gameState = NOT_GENERATED;
    textStatus.innerText = "minesweep";
    counter.innerText = mineAmt.toString();
    for (let child of container.children) {
        child.innerHTML = "";
        if (child.style.backgroundColor == "red") {
            child.style.backgroundColor = "";
        }
    }
}

function hasNeighbour(sourceX, sourceY, neighbourX, neighbourY) {
    for (let dir of DIRECTIONS) {
        let tx = sourceX + dir[0];
        let ty = sourceY + dir[1];
        if (tx == neighbourX && ty == neighbourY) {
            return true
        }
    }
    return false
}

function generateGrid(safeX, safeY) {
    // generates a grid, with position (safeX, safeY) being guaranteed clear

    counter.innerText = mineAmt.toString();
    gameState = RUNNING;
    textStatus.textContent = "minesweep";
    grid = [];
    for (i = 0; i < tilesWidth; i++) {
        let row = [];
        for (j = 0; j < tilesWidth; j++) {
            row.push(0);
        }
        grid.push(row)
    }
    // generate mines
    let i2 = 0;
    while (i2 < mineAmt) {
        let x = Math.floor(Math.random() * tilesWidth);
        let y = Math.floor(Math.random() * tilesWidth);

        if ((x == safeX && y == safeY) || grid[x][y] == MINE || hasNeighbour(x, y, safeX, safeY)) {
            continue;
        }

        i2 += 1;
        // set mine
        grid[x][y] = MINE;

        // update neighbours
        for (let dir of DIRECTIONS) {
            let tx = x + dir[0];
            let ty = y + dir[1];
            if (tx >= 0 && ty >= 0 && tx < tilesWidth && ty < tilesWidth && grid[tx][ty] != MINE) {
                grid[tx][ty] += 1;
            }
        }
    }
}

function showTileXY(x, y) {
    let id = x + y * tilesWidth;
    let e = container.children[id];
    let value = grid[x][y];

    let flag = e.innerHTML.includes(FLAG_CHAR);
    if (flag) {
        if (value == MINE) {
            return;
        } else {
            e.innerHTML = "<p class='flag'>x</p>";
            return;
        }

    }


    let classText = value == MINE ? "Mine" : value.toString();
    let text = value == MINE ? "x" : value.toString();
    e.innerHTML = "<p class='mine" + classText + "'>" + text + "</p>";
}
function showTileID(id) {
    let x = Math.floor(id % tilesWidth);
    let y = Math.floor(id / tilesWidth);
    showTileXY(x, y);
}
function revealAllTiles() {
    for (i = 0; i < tilesWidth; i++) {
        for (j = 0; j < tilesWidth; j++) {
            showTileXY(i, j);
        }
    }
}
function revealMines() {
    for (i = 0; i < tilesWidth; i++) {
        for (j = 0; j < tilesWidth; j++) {
            let id = i + j * tilesWidth;
            if (grid[i][j] == MINE || container.children[id].innerHTML.includes(FLAG_CHAR)) {
                showTileXY(i, j);
            }
        }
    }
}
function checkIfWin() {
    for (i = 0; i < tilesWidth; i++) {
        for (j = 0; j < tilesWidth; j++) {
            if (grid[i][j] == MINE) {
                let id = i + j * tilesWidth;
                if (!container.children[id].innerHTML.includes(FLAG_CHAR)) {
                    console.log(i, j);
                    return;
                }
            }
        }
    }
    // win!!
    gameState = WIN;
    textStatus.innerHTML = "you win !! <img class='emoji' src='./emojis/yay.gif'>";
    revealAllTiles();
}
function pressTile(event) {
    if (gameState == LOSE) {
        return;
    }
    function recursiveExpand(x, y) {
        showTileXY(x, y);
        if (grid[x][y] == 0) {
            // if tile is completely empty, recursively click all neighbouring tiles (that are also 0)
            for (let dir of DIRECTIONS) {
                let tx = x + dir[0];
                let ty = y + dir[1];
                if (tx >= 0 && ty >= 0 && tx < tilesWidth && ty < tilesWidth && container.children[tx + ty * tilesWidth].innerHTML == "") {
                    recursiveExpand(tx, ty);
                }
            }
        }
    }

    let element = event.target;
    let id = [...element.parentElement.children].indexOf(element);

    if (event.buttons == 2 && (element.innerHTML == "" || element.innerHTML.includes(FLAG_CHAR))) {
        let flagPresent = element.innerHTML != "";
        if (flagPresent) {
            counter.innerText = (parseInt(counter.innerText) + 1).toString();
            element.innerHTML = "";
        } else {
            let amt = parseInt(counter.innerText) - 1;
            counter.innerText = amt.toString();
            element.innerHTML = "<p class='flag'>" + FLAG_CHAR + "</p>";
            if (amt == 0) {
                checkIfWin();
            }
        }
    }
    else if (event.buttons == 1 && element.innerHTML == "") {
        let x = Math.floor(id % tilesWidth);
        let y = Math.floor(id / tilesWidth);


        if (gameState == NOT_GENERATED) {
            generateGrid(x, y);
        }

        if (grid[x][y] == MINE) {
            textStatus.textContent = "you lose !";
            revealMines();
            element.style.backgroundColor = "red";
            gameState = LOSE;
        } else {
            recursiveExpand(x, y);
        }
    }
}

for (i = 0; i < tilesWidth; i++) {
    let row = [];
    for (j = 0; j < tilesWidth; j++) {
        let newE = document.createElement("div");
        newE.addEventListener("mousedown", pressTile);
        container.appendChild(newE);

        row.push(0);
    }
    grid.push(row)
}

if (cheats) {
    // cheats :>
    addEventListener("keydown", (event) => {
        if (event.key == "w") {
            revealAllTiles();
            for (i = 0; i < tilesWidth; i++) {
                for (j = 0; j < tilesWidth; j++) {
                    if (grid[i][j] == MINE) {
                        let id = i + j * tilesWidth;
                        container.children[id].innerHTML = "";
                    }
                }
            }
        }
    })
}