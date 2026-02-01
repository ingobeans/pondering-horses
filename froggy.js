let froggy = document.getElementById("froggy");
let froggyChat = document.getElementById("froggyChat")
let froggyInput = document.getElementById("froggyInput");
let froggyChatMessages = document.getElementById("froggyChatMessages");

let shown = false;

function updateVisibility() {
    froggyChat.style.display = shown ? "" : "none";
    froggy.style.display = !shown ? "" : "none";
}

function clickFroggy() {
    shown = !shown;
    updateVisibility();
}

function closeFroggy() {
    shown = false;
    updateVisibility();
}

froggyInput.addEventListener("keydown", (wa) => {
    if (wa.key != "Enter") {
        return;
    }
    let value = froggyInput.value;
    froggyInput.value = "";
    let userMessageElement = document.createElement("p");
    userMessageElement.className = "froggyUserMessage";
    userMessageElement.innerText = value;
    froggyChatMessages.appendChild(userMessageElement);

    let froggyMessageElement = document.createElement("p");
    froggyMessageElement.className = "froggyMessage";
    froggyMessageElement.innerText = generateResponse(value);
    froggyChatMessages.appendChild(froggyMessageElement);
});

function containsPhrase(text, phrase) {
    return (text == phrase || text.startsWith(phrase + " ") || text.endsWith(" " + phrase) || text.includes(" " + phrase + " "))
}

function generateResponse(text) {
    text = text.toLowerCase();


    for (let phrase of PHRASES) {
        for (let variant of phrase[0]) {
            if (containsPhrase(text, variant)) {
                return phrase[1][Math.floor(Math.random() * phrase[1].length)]
            }
        }
    }
    return "ribbit"
}

const PHRASES = [
    [["hello", "hi", "good day", "mornin", "whats up", "wsg", "sup", "hiya"], ["hi!!!", "good day ! (or night)", "hwello", "hiya", "hi there"]],
];