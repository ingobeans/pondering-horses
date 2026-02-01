let froggy = document.getElementById("froggy");
let froggyChat = document.getElementById("froggyChat")
let froggyInput = document.getElementById("froggyInput");
let froggyChatMessages = document.getElementById("froggyChatMessages");

let shown = false;

function updateVisibility() {
    froggyChat.style.display = shown ? "" : "none";
    froggy.style.display = !shown ? "" : "none";
    if (shown) {
        froggyInput.focus();
    }
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

    froggyChatMessages.scrollTo(0, froggyChatMessages.scrollHeight);
});

function containsPhrase(text, phrase) {
    return (text == phrase || text.startsWith(phrase + " ") || text.endsWith(" " + phrase) || text.includes(" " + phrase + " "))
}

function preprocessText(text) {
    text = text.toLowerCase();
    text = text.replaceAll("you", "u");
    text = text.replaceAll("i'm", "i am");
    text = text.replaceAll("u're", "u are");
    text = text.replaceAll("'", "");

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

function getQuestionType(text) {
    for (let [key, regexes] of Object.entries(QUESTION_TYPE_REGEXES)) {
        for (let regex of regexes) {
            let match = text.match(regex);
            if (match != null) {
                return [key, match[1]];
            }
        }
    }
    return [null, null];
}

function generateResponse(text) {
    if (text.includes(":3")) {
        return ":3"
    }

    text = preprocessText(text);

    for (let phrase of PHRASES) {
        for (let variant of phrase[0]) {
            if (containsPhrase(text, variant)) {
                return phrase[1][Math.floor(Math.random() * phrase[1].length)]
            }
        }
    }

    let [type, subject] = getQuestionType(text);
    if (type != null) {
        for (let entry of KNOWLEDGE[type]) {
            for (let subjectName of entry[0]) {
                if (subject == subjectName || subjectName == "*" || subject.includes(subjectName)) {
                    return entry[1][Math.floor(Math.random() * entry[1].length)].replaceAll("$", subject)
                }
            }
        }
    }

    return "ribbit"
}

const QUESTION_TYPE_REGEXES = {
    "opinions": [
        /what u think of ([a-z ]*)/,
        /what u think about ([a-z ]*)/,
        /what do u think of ([a-z ]*)/,
        /what do u think about ([a-z ]*)/,
        /do u like ([a-z ]*)/,
        /what is ur opinion on ([a-z ]*)/,
        /what is ur opinion of ([a-z ]*)/,
    ],
    "personalFacts": [
        /what kind of ([a-z ]*) do u/,
        /what kind of ([a-z ]*) u/,
        /what do u like ([a-z ]*)/,
        /whats ur favorite ([a-z ]*)/,
        /what ([a-z ]*) do u/,
        /what ([a-z ]*) u/,
        /u like ([a-z ]*)/,
    ],
    "facts": [
        /what is a ([a-z ]*)/,
        /whats a ([a-z ]*)/,
        /what are ([a-z ]*)/,
        /what a ([a-z ]*) is/,
        /what ([a-z ]*) do u use/,
        /what ([a-z ]*) u use/,
        /what ([a-z ]*) are u using/,
        /where is ([a-z ]*)/,
        /where can i see ([a-z ]*)/,
        /where are ([a-z ]*)/,
        /even is a ([a-z ]*)/,
        /how [a-z]* is ([a-z ]*)/,
        /what is the [a-z]* of the ([a-z ]*)/,
        /what is the ([a-z ]*)/,
        /whats the [a-z]* of the ([a-z ]*)/,
        /whats the ([a-z ]*)/,
    ],
    "userFacts": [
        /i like ([a-z ]*)/,
        /i love ([a-z ]*)/,
        /i love to ([a-z ]*)/,
        /i hate ([a-z ]*)/,
        /i hate to ([a-z ]*)/,
        /i like to ([a-z ]*)/,
        /i have ([a-z ]*)/,
    ],
    "userBeing": [
        /i am ([a-z ]*)/,
        /im ([a-z ]*)/,
        /my name is ([a-z ]*)/,
        /i feel like ([a-z ]*)/,
    ]
}

const KNOWLEDGE = {
    "opinions": [
        [["toads", "toad"], ["toads are like frogs but big and lumpy.", "frogs are way cooler (in my humble opinion)"]],
        [["frogs"], ["gosh i heckin love frogs"]],
        [["food", "eating"], ["i love eating food, mostly bugs"]],
        [["beans"], ["i mostly eat bugs, not beans"]],
        [["whittling"], ["i love whittling!"]],
        [["frogging"], ["i always frog around!"]],
        [["war"], ["war < froggy", "war is pretty lame if i may say so myself"]],
        [["school", "biology", "chemistry", "physics", "math", "golgi"], ["imagine having school lmfao i just frog around all day haha nerd"]],
        [["microsoft"], ["microsoft more like lame-rosoft haha gottem"]],
        [["rust"], ["rust is best programming lang ever !!!!"]],
        [["*"], ["i dont really have an opinion of that", "i dont have an opinion of that", "mm hard to say"]],
    ],
    "personalFacts": [
        [["doing"], ["i like making frog sounds and whittling"]],
        [["music"], ["i mostly listen to 'frog sounds asmr'"]],
        [["lang", "programming lang", "programming language"], ["rust."]],
    ],
    "facts": [
        [["moon"], ["the moon has a radius of 1,737.5 km"]],
        [["projects"], ["here is the <a href='./projects.html'>projects site</a>"]],
        [["toads", "toad"], ["toads are like frogs but big and lumpy."]],
        [["frog"], ["a frog is the most beautiful thing in the world (in my humble opinion)"]],
        [["web browser", "webbrowser", "browser"], ["my favorite web browser is <a href='https://github.com/ingobeans/toad'>TOAD</a> (even though i normally dont like toads)"]],
        [["lang"], ["rust is best programming language."]],
        [["u"], ["im just a frog, frogging my way through frog life"]],
        [["*"], ["i dont know??", "youre asking the real questions now", "i'll have to think about that", "mmm hard to say"]],
    ],
    "userFacts": [
        [["play videogames", "play games"], ["i like minecraft"]],
        [["music"], ["good for you! i love music!!!!"]],
        [["school"], ["sometimes school can be really fun if youre lucky, but sometimes it can be really poop (forgive my language)"]],
        [["job", "employed"], ["imagine havign a job lmfao... i just frog around all day"]],
        [["disease", "a cold"], ["aww i hope u get better !"]],
        [["*", "cool !", "thats nice", "mm i hear you", "yeah"]],
    ],
    "userBeing": [
        [["happy", "glad", "good mood",], ["<img class='emoji' src='./emojis/yay.gif'> good for you!! if youre happy im happy <img class='emoji' src='./emojis/yay.gif'>"]],
        [["sad", "depressed", "giving up", "give up", "shit"], ["that sucks. as a froggy i cant do much but say that i hope things get better. speak to someone, it'll help"]],
        [["sick of", "tired of"], ["yeah. that can really suck"]],
        [["tired",], ["poor thing. we all deserve rest. i myself spend most of the day sleeping."]],
        [["starting to understand",], ["yay! learning is awesome!"]],
        [["sick", "ill"], ["i hope ya get better!"]],
        [["*"], ["hi $, i'm froggy"]]
    ]
}

const PHRASES = [
    [["hello", "hi", "good day", "mornin", "whats up", "wsg", "sup", "hiya", "yo"], ["hi!!!", "good day ! (or night)", "hwello", "hiya", "hi there"]],
    [["who are u", "whos this", "what is froggy", "who this", "what are u"], ["i am froggy!", "froggy's the name, chatting's the game", "im just froggy :3", "im just a frog, frogging my way through frog life"]],
    [["how are u", "how u doing", "how u doin", "hows it going"], ["im good ! how are you ?", "i am great! you?", "im good, just glad to be talking with you !!"]],
    [["so cool", "wow", "this is sick", "this is cool", "amazing", "woah"], ["<img class='emoji' src='./emojis/yay.gif'>"]],
    [["who made this", "who made u", "who created this", "who created u"], ["take a guess..", "probably the person who created the rest of the website"]],
    [["tell me about u", "tell me about urself", "what do u like to do", "what do u like doing", "what u like doing", "hobbies", "tell me about froggy", "your spare time"], ["i like making frog sounds and whittling"]],
    [["i love u", "u are so cute", "u are cute"], ["of course you do ! im froggy", "i love you too <3"]],
    [["are u a frog", "how is frog life", "how is life as a frog", "hows life as a frog", "whats frog life like"], ["frog life > human life", "being a frog is great! i <u>never</u> pay taxes"]],
    [["tax fraud"], ["i love tax fraud <3"]],
    [["vim", ["emacs better"]]],
    [["emacs", ["vim better"]]],
    [["any brothers or sisters", "u have any family", "u have family", "u have friends", "u have any friends"], ["my frog hive consists of over 200 fellow frogs !"]],
    [["ur pronouns"], ["just refer to me by name"]],
    [["doctor who"], "omg i love that show"],
    [["whats the point of life", "meaning of life"], ["life is like jumping between two far away lilypads: its scary, theres no way to know if you'll succeed and if you fail youll be swept up by the river- but, when you are in the middle of the jump, soaring through the sky, everything is quite beautiful, and you know that at the end of the day, you always were going to make the jump"]],
    [["hamburger"], ["burghammer"]],
    [["u think of toads"], ["toads are like frogs but big and lumpy.", "frogs are way cooler (in my humble opinion)"]],
    [["how do i"], ["by believing in yourself !"]],
    [["life is hard"], ["but you are a champion !!"]],
];