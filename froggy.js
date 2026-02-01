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

froggyInput.addEventListener("keydown", (event) => {
    if (event.key == "Escape") {
        shown = false;
        updateVisibility();
    }
    if (event.key != "Enter") {
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

function preprocessText(text) {
    text = text.toLowerCase();
    text = text.replaceAll("you", "u");

    let newText = "";
    for (let char of text) {
        let isAlphabetic = /^[A-Za-z]+$/.test(char);
        if (isAlphabetic) {
            newText += char;
        } else {
            newText += " ";
        }
    }
    return newText
}

function generateResponse(text) {
    if (text.includes(":3")) {
        return ":3"
    }

    text = preprocessText(text);

    for (let phrase of PHRASES) {
        console.log(phrase);
        for (let variant of phrase[0]) {
            if (containsPhrase(text, variant)) {
                return phrase[1][Math.floor(Math.random() * phrase[1].length)]
            }
        }
    }
    return "ribbit"
}

const PHRASES = [
    [["hello", "hi", "good day", "mornin", "whats up", "wsg", "sup", "hiya", "yo"], ["hi!!!", "good day ! (or night)", "hwello", "hiya", "hi there"]],
    [["who are u", "whos this", "what is froggy", "who this", "what are u"], ["i am froggy!", "froggy's the name, chatting's the game", "im just froggy :3"]],
    [["how are u", "how u doing", "how u doin", "hows it going"], ["im good ! how are you ?", "i am great! you?", "im good, just glad to be talking with you !!"]],
];