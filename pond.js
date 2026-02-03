let timeElement = document.getElementById("time-counter").children[0];
let time = localStorage.getItem("pondTime") | 0;

let base = "time spent at the pond: ";


// only update localStorage every 3 seconds or so
let timeTilLocalstorage = 0;
function trackTime() {
    time += 1;
    timeTilLocalstorage -= 1;
    if (timeTilLocalstorage <= 0) {
        timeTilLocalstorage = 3;
        localStorage.setItem("pondTime", time)
    }

    // format time!!
    let seconds = time;
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);
    let formatted = "";

    // parts consists of data of how to format each part of the data. each item contains:
    //  - value
    //  - letter
    //  - modulo (eg, 60 for seconds, 24 for hours)
    let parts = [[days, "d", null], [hours, "h", 24], [minutes, "m", 60], [seconds, "s", 60]];
    for (let part of parts) {
        if (part[0] > 0) {
            if (part[2] != null) {
                part[0] = part[0] % part[2];
            }
            formatted += part[0].toString() + part[1] + " ";
        }
    }
    timeElement.innerHTML = base + formatted

    // Source - https://stackoverflow.com/a/7188188
    // Posted by Shef, modified by community. See post 'Timeline' for change history
    // Retrieved 2026-02-03, License - CC BY-SA 3.0
    setTimeout(trackTime, 1000);
}

trackTime();

timeElement.parentElement.style.display = "flex";