// general javascript for the website

const splashTextElement = document.getElementById("splash");

const texts = [
    "hello there!",
    "did you know? most people experience <a href='https://en.wikipedia.org/wiki/Bees'>bees</a>",
    "you should rewrite it in rust.",
    "e<sup><em>i</em>π</sup> + 1 = 0",
    "this website is hosted on <a href='https://en.wikipedia.org/wiki/Mars'>mars</a>",
    "you are always allowed to eat cake",
    "nobody stops you from brushing your teeth thrice in a day!",
    "the <em>wizard</em> is in containment",
    "all profits of this website go directly to YOU",
    "microsoft approved"
];

splashTextElement.innerHTML = texts[Math.floor(Math.random() * texts.length)];
splashTextElement.style.fontSize = (-0.26 * splashTextElement.innerText.length + 29.1) + "px";