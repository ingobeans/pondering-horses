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

    if (value == "" || value.match(/^ *$/) !== null) {
        return;
    }
    let userMessageElement = document.createElement("p");
    userMessageElement.className = "froggyUserMessage";
    userMessageElement.innerText = value;
    froggyChatMessages.appendChild(userMessageElement);

    let froggyMessageElement = document.createElement("p");
    froggyMessageElement.className = "froggyMessage";
    froggyMessageElement.innerHTML = "> " + generateResponse(value);
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
    [["so cool", "wow", "this is sick", "this is cool", "amazing", "woah"], ["<img class='emoji' src='./emojis/yay.gif'>"]],
    [["who made this", "who made u", "who created this", "who created you"], ["take a guess..", "probably the person who created the rest of the website"]],
    [["tell me about u", "tell me about yourself", "what do u like to do", "what do u like doing", "what u like doing", "hobbies", "tell me about froggy", "your spare time"], ["i like making frog sounds and whittling"]],
    [["i love u", "u are so cute", "u are cute"], ["of course you do ! im froggy", "i love you too <3"]],
    [["are u a frog", "how is frog life", "how is life as a frog", "hows life as a frog"], ["frog life > human life", "being a frog is great! i <u>never</u> pay taxes"]],
    [["tax fraud"], ["i love tax fraud <3"]],
    [["vim", ["emacs better"]]],
    [["emacs", ["vim better"]]],
    [["any brothers or sisters", "u have any family", "u have family", "u have friends", "u have any friends"], ["my frog hive consists of over 200 fellow frogs !"]],
    [["your pronouns"], ["just refer to me by name"]],
    [["doctor who"], "omg i love that show"],
    [["whats the point of life", "meaning of life"], ["life is like jumping between two far away lilypads: its scary, theres no way to know if you'll succeed and if you fail youll be swept up by the river- but, when you are in the middle of the jump, soaring through the sky, everything is quite beautiful, and you know that at the end of the day, you always were going to make the jump"]],
    [["hamburger"], ["burghammer"]],
    [["u think of toads"], ["toads are like frogs but big and lumpy.", "frogs are way cooler (in my humble opinion)"]],
];