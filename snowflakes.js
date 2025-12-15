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
    // Each snowflake's custom angle can also change over time (following a sine wave), 
    // and how much the custom angle changes over time is also dependant on a unique factor

    let new_snowflake = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        followCustomAngleFactor: Math.random(),
        customAngle: Math.random() * (3.14 / 2),
        lifetime: Math.random() * 7.0,
        gradualCustomAngleVariationFactor: Math.random(),
    };
    snowflakes.push(new_snowflake);
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
        ctx.drawImage(snowflake, s.x, s.y);
        if (s.x > canvas.width || s.y > canvas.height) {
            let yAxis = Math.random() > 0.5;
            if (yAxis) {
                s.x = -30;
                s.y = Math.random() * canvas.height - 30;
            } else {
                s.x = Math.random() * canvas.width - 30;
                s.y = -30;
            }
        }
        // move to bottom right
        s.x += 1 * deltaTime / 1000.0 * 75.0;
        s.y += 1 * deltaTime / 1000.0 * 75.0;
        // move by custom angle
        s.x += s.followCustomAngleFactor * (Math.cos(s.customAngle + s.gradualCustomAngleVariationFactor * (Math.sin(s.lifetime) + 1.0) / 2.0)) * deltaTime / 1000.0 * 75.0;
        s.y += s.followCustomAngleFactor * (Math.sin(s.customAngle + s.gradualCustomAngleVariationFactor * (Math.sin(s.lifetime) + 1.0) / 2.0)) * deltaTime / 1000.0 * 75.0;
        // update lifetime
        s.lifetime += deltaTime / 1000;

    });
    requestAnimationFrame(update);
}
update();