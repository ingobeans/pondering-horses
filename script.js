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



let snowflakes = [];

let snowflake_amt = 100;

for (let i = 0; i < snowflake_amt; i++) {
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
        s[0] += 1;
        s[1] += 1;
        s[0] += s[2] * (Math.cos(s[3] + s[5] * (Math.sin(s[4]) + 1.0) / 2.0));
        s[1] += s[2] * (Math.sin(s[3] + s[5] * (Math.sin(s[4]) + 1.0) / 2.0));

        s[4] += deltaTime / 1000;

    });
    requestAnimationFrame(update);
}
update();