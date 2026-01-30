let windows = document.getElementsByClassName("window-decoration");
var arr = Array.prototype.slice.call(windows);

let lastDragged = null;
let dragging = null;
let draggingOffset = [0, 0];
let mouse = [0, 0];

let fakebody = document.getElementById("fakebody");
let bounding = document.body.getBoundingClientRect();
fakebody.style.width = bounding.right - bounding.left + "px";
fakebody.style.height = bounding.bottom - bounding.top + "px";
fakebody.style.left = "0";
fakebody.style.right = "0";
fakebody.style.position = "absolute";
fakebody.style.overflow = "hidden";
fakebody.style.pointerEvents = "auto";

addEventListener("resize", (event) => {
    console.log(2);
    fakebody.style.width = window.innerWidth + "px";
    fakebody.style.height = document.body.clientHeight + "px";
});

function pauseEvent(e) {
    if (e.stopPropagation) e.stopPropagation();
    if (e.preventDefault) e.preventDefault();
    e.cancelBubble = true;
    e.returnValue = false;
    return false;
}

for (let windowBar of windows) {
    windowBar.addEventListener("mousedown", (event) => {
        document.body.style.pointerEvents = "none";
        pauseEvent(event || windowBar.event);
        if (lastDragged != null) {
            lastDragged.style.zIndex = 300;
        }
        let parent = windowBar.parentElement;
        dragging = parent;
        lastDragged = dragging;
        let bounding = parent.getBoundingClientRect();
        let containerBounding = parent.parentElement.getBoundingClientRect();
        draggingOffset = [-containerBounding.left + bounding.left - mouse[0] - 6.0, -containerBounding.top + bounding.top - mouse[1] - 6.0];
        if (parent.style.position != "absolute") {
            let ghost = document.createElement("game");
            ghost.style.visibility = "hidden";
            parent.parentElement.insertBefore(ghost, parent);
            fakebody.appendChild(parent);
            draggingOffset = [bounding.left - mouse[0] - 6.0, bounding.top - mouse[1] + window.scrollY - 6.0];
        }
        parent.style.position = "absolute";
        parent.style.left = draggingOffset[0] + mouse[0] + "px";
        parent.style.top = draggingOffset[1] + mouse[1] + "px";
        parent.style.zIndex = 500;
    })
};
document.addEventListener("mouseup", (_) => {
    dragging = null;
    document.body.style.pointerEvents = "unset";
})
document.addEventListener("mousemove", (event) => {
    mouse = [event.x, event.y];
    if (dragging != null) {
        dragging.style.left = draggingOffset[0] + mouse[0] + "px";
        dragging.style.top = draggingOffset[1] + mouse[1] + "px";
    }
})
