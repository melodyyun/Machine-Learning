//Please check out LearnCode.academy's video where I learned from: https://youtu.be/9Hz3P1VgLz4
const network = new brain.NeuralNetwork();

//grabbing variables from the DOM
const input = $(".color-input");
const body = $("body");
const ghost = $('.ghost');
const discoBall = $('.disco-ball');
const eyeBrows = $('.eyebrows');
const eyeBrowLeft =$('.eyebrow-left');
const eyeBrowRight =$('.eyebrow-right');
const speech = $('.speech-container');
const ghostContainer = $('.ghost-container');
//This music was made by my incredible instructor Danny Paton from HackerYou
//check out the official video at https://youtu.be/Cn5aRcCtSCQ
const audioHappy = new Audio('hue-the-bump.mp3');
const audioBad = new Audio('bad-audio.mp3');

//on change of the colour input get the colour value and evaluate if this is a light or dark colour using the following training data points
input.on("change", (e) => {
    const rgb = getRgb(e.target.value);
    console.log(rgb);
    network.train([
        //white
        { input: { r: 1, g: 1, b: 1 }, output: { light: 1 } },
        //red
        { input: { r: 1, g: 0, b: 0 }, output: { light: 1 } },
        //green
        { input: { r: 0, g: 1, b: 0 }, output: { light: 1 } },
        //blue
        //{ input: { r: 0, g: 0, b: 1 }, output: { light: 1 } },
        
        //black
        { input: { r: 0, g: 0, b: 0}, output: { dark: 1 } },
    ])
    //getting the brain to evaluate the likely outcome if it's a light colour or a dark colour
    const result = brain.likely(rgb, network);

    console.log(result);
    //change the background of the body
    body.css('background', e.target.value)

    //if the result id dark change to white ghost and make the ghost say I will kill you
    if (result === "dark") {
        discoBall.fadeOut();
        ghost.empty();
        ghost.append(`<img src="assets/cute-ghost-white.png" alt="cute ghost white colour">`);
        eyeBrows.css('background', 'white');
        eyeBrowLeft.css('transform', 'rotate(15deg)');
        eyeBrowRight.css('transform', 'rotate(-15deg)');
        speech.css('visibility', 'visible');
        ghostContainer.removeClass('animated');
        audioHappy.pause();
        audioBad.play();
    } else {
    //let the ghost dance it's heart out to The Bump by Hue
        discoBall.fadeIn();
        ghost.empty();
        ghost.append(`<img src="assets/cute-ghost.png" alt="cute ghost">`);
        speech.css('visibility', 'hidden');
        eyeBrows.css('background', 'black');
        eyeBrowLeft.css('transform', 'rotate(-15deg)');
        eyeBrowRight.css('transform', 'rotate(15deg)');
        ghostContainer.addClass('animated');
        audioBad.pause();
        audioBad.currentTime = 0;
        audioHappy.play();
    }
});

//This function down here converts hex colour to rgb and is from LearnCode.academy's video
function getRgb(hex) {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: Math.round(parseInt(result[1], 16) / 2.55) / 100,
        g: Math.round(parseInt(result[2], 16) / 2.55) / 100,
        b: Math.round(parseInt(result[3], 16) / 2.55) / 100,
    } : null;
}

