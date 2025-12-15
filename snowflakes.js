const canvas = document.getElementById("canvas");
const snowflake = document.getElementById("snowflake");
const ctx = canvas.getContext("2d");

let targetAmtSnowflakes;

canvas.width = 0;
canvas.height = 0;

let snowflakes = [];

function resizeCanvas() {
    let oldWidth = canvas.width;
    let oldHeight = canvas.height;
    canvas.height = document.body.clientHeight;
    canvas.width = document.body.clientWidth;
    targetAmtSnowflakes = Math.floor(100 * canvas.width * canvas.height / (1920 * 1479));

    // add snowflakes to fill empty space
    if (snowflakes.length < targetAmtSnowflakes) {
        let amtToGenerate = targetAmtSnowflakes - snowflakes.length;
        while (amtToGenerate > 0) {
            let new_snowflake = generateSnowflake();
            if (new_snowflake.x < oldWidth && new_snowflake.y < oldHeight) {
                continue
            }
            amtToGenerate -= 1;
            snowflakes.push(new_snowflake);
        }
    }
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);
document.addEventListener('DOMContentLoaded', resizeCanvas, false);


function generateSnowflake() {
    // Each snowflake moves to the bottom right of the screen, 
    // but also has a custom angle that it moves towards.
    // Each snowflake has a unique factor for how much this custom angle affects its movement.
    // Each snowflake's custom angle can also change over time (following a sine wave), 
    // and how much the custom angle changes over time is also dependant on a unique factor
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        followCustomAngleFactor: Math.random(),
        customAngle: Math.random() * (3.14 / 2),
        lifetime: Math.random() * 7.0,
        gradualCustomAngleVariationFactor: Math.random(),
    }
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

    let index = snowflakes.length - 1;
    while (index >= 0) {
        let s = snowflakes[index];
        ctx.drawImage(snowflake, s.x, s.y);
        if (s.x > canvas.width || s.y > canvas.height) {
            if (snowflakes.length > targetAmtSnowflakes) {
                snowflakes.splice(index, 1);
            }

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
        index -= 1;
    }
    requestAnimationFrame(update);
}
update();