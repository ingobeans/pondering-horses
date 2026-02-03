let timeElement = document.getElementById("time-counter").children[0];
let time = localStorage.getItem("pondTime") | 0;

let base = "time spent at the pond: ";

// Source - https://stackoverflow.com/a/7188188
// Posted by Shef, modified by community. See post 'Timeline' for change history
// Retrieved 2026-02-03, License - CC BY-SA 3.0

let timeTilLocalstorage = 0;

function trackTime() {
    time += 1;
    timeTilLocalstorage -= 1;
    if (timeTilLocalstorage <= 0) {
        timeTilLocalstorage = 3;
        localStorage.setItem("pondTime", time)
    }
    let seconds = time;
    let minutes = Math.floor(time / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);
    let formatted = "";
    let parts = [[days, "d", null], [hours, "h", 24], [minutes, "m", 60], [seconds, "s", 60]];
    console.log(minutes);
    for (let part of parts) {
        if (part[0] > 0) {
            if (part[2] != null) {
                part[0] = part[0] % part[2];
            }
            formatted += part[0].toString() + part[1] + " ";
        }
    }
    timeElement.innerHTML = base + formatted
    setTimeout(trackTime, 1000);
}

trackTime();

timeElement.parentElement.style.display = "flex";