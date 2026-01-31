let container = document.getElementById("minesweeper-container");
let textStatus = document.getElementById("minesweeper-text");

let containerSize = 304;
let size = 16;

const RUNNING = 1;
const LOSE = 2;

let gameState = RUNNING;

container.style.width = containerSize + "px";
container.style.height = containerSize + "px";
let tilesWidth = Math.floor(containerSize / size);

let text = "";
for (i = 0; i < tilesWidth; i++) {
    text += " 16px";
}
container.style.gridTemplateColumns = text;
container.style.gridTemplateRows = text;

let grid = [];

let cheats = false;

let mineDensity = 0.1;
let mineAmt = Math.floor(mineDensity * tilesWidth * tilesWidth);

// special value for representing a mine tile.
// all other values in the grid represent the amount of neighbouring mines
const MINE = 123;


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

function showTileXY(x, y) {
    let id = x + y * tilesWidth;
    let e = container.children[id];
    let value = grid[x][y];
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
function pressTile(event) {
    if (gameState != RUNNING) {
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

    if (element.innerHTML == "") {
        let x = Math.floor(id % tilesWidth);
        let y = Math.floor(id / tilesWidth);

        if (grid[x][y] == MINE) {
            textStatus.textContent = "you lose !";
            revealAllTiles();
            element.children[0].style.color = "white";
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


// generate mines
for (i = 0; i < mineAmt; i++) {
    let x = Math.floor(Math.random() * tilesWidth);
    let y = Math.floor(Math.random() * tilesWidth);
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

if (cheats) {
    // cheats :>
    revealAllTiles();
}