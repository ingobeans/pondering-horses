const canvas = document.getElementById("canvas");
const snowflake = document.getElementById("snowflake");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.height = document.body.clientHeight;
    canvas.width = document.body.clientWidth;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);
document.addEventListener('DOMContentLoaded', resizeCanvas, false);

const snowflake_amt = 100;

let snowflakes = [];
// populate snowflakes array
for (let i = 0; i < snowflake_amt; i++) {
    // Each snowflake moves to the bottom right of the screen, 
    // but also has a custom angle that it moves towards.
    // Each snowflake has a unique factor for how much this custom angle affects its movement.
    // Each snowflakes custom angle can also change over time (following a sine wave), 
    // and how much the custom angle changes over time is also dependant on a unique factor

    // Each snowflake is stored as an array, with properties being:
    //    -x
    //    -y
    //    -follow custom angle factor
    //    -custom angle (0 - 3.14/2)
    //    -gradual custom angle variation factor
    //    -lifetime (used by gradual custom angle variation factor)


    snowflakes.push([Math.random() * canvas.width, Math.random() * canvas.height, Math.random(), Math.random() * (3.14 / 2), Math.random() * 7.0, Math.random()]);
}

let lastTime;
function update(now) {
    if (!lastTime) { lastTime = now; }
    var deltaTime = now - lastTime;
    if (!deltaTime) {
        deltaTime = 0;
    }
    lastTime = now;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    snowflakes.forEach(s => {
        ctx.drawImage(snowflake, s[0], s[1]);
        if (s[0] > canvas.width || s[1] > canvas.height) {
            let yAxis = Math.random() > 0.5;
            if (yAxis) {
                s[0] = -30;
                s[1] = Math.random() * canvas.height - 30;
            } else {
                s[0] = Math.random() * canvas.width - 30;
                s[1] = -30;
            }
        }
        // move to bottom right
        s[0] += 1 * deltaTime / 1000.0 * 75.0;
        s[1] += 1 * deltaTime / 1000.0 * 75.0;
        // move by custom angle
        s[0] += s[2] * (Math.cos(s[3] + s[5] * (Math.sin(s[4]) + 1.0) / 2.0)) * deltaTime / 1000.0 * 75.0;
        s[1] += s[2] * (Math.sin(s[3] + s[5] * (Math.sin(s[4]) + 1.0) / 2.0)) * deltaTime / 1000.0 * 75.0;
        // update lifetime
        s[4] += deltaTime / 1000;

    });
    requestAnimationFrame(update);
}
update();