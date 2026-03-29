// this script contains general javascript for the website

// draw splash text
const splashTextElement = document.getElementById("splash");
const texts = [
    "hello there!",
    "did you know? most people experience <a href='https://en.wikipedia.org/wiki/Bees'>bees</a>",
    "you should rewrite it in rust.",
    "e<sup><em>i</em>π</sup> + 1 = 0",
    "this website is hosted on <a href='https://en.wikipedia.org/wiki/Mars'>mars</a>",
    "you are always allowed to eat cake",
    "nobody stops you from brushing your teeth thrice in a day!",
    "the <em>wizard</em> is in containment",
    "all profits of this website go directly to YOU",
    "microsoft approved",
];

splashTextElement.innerHTML = texts[Math.floor(Math.random() * texts.length)];
splashTextElement.style.fontSize = (-0.26 * splashTextElement.innerText.length + 29.1) + "px";

let dvd = document.getElementById("dvd");
let newDvd = document.createElement("img");
newDvd.src = "./images/beans.png"
newDvd.style = "filter: hue-rotate(0deg) drop-shadow(5px 5px 0 black); width: 100px; height: 50px;";
newDvd.className = "imgshadow";
dvd.appendChild(newDvd);

const COLORS = [
    0, 280, 172, 100, 130
];

function changeColor() {
    let old = newDvd.style.filter.split("(")[1].split("d")[0];
    let newColor = old;
    while (newColor == old) {
        newColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    }
    newDvd.style = "filter: hue-rotate(" + newColor + "deg) drop-shadow(5px 5px 0 black); width: 100px; height: 50px;";
}

let oldDx = 0;
let oldDy = 0;
let oldX = -1;
let oldY = -1;
function updateDvd() {
    let bounding = newDvd.getBoundingClientRect();
    let x = bounding.left;
    let y = bounding.top;
    let dx = oldX - x > 0 ? 1 : 0;
    let dy = oldY - y > 0 ? 1 : 0;
    oldX = x;
    oldY = y;
    if (dx != oldDx || dy != oldDy) {
        changeColor();
    }
    oldDx = dx;
    oldDy = dy;
}