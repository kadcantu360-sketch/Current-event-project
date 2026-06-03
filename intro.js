<<<<<<< HEAD
const obomnaImage = document.getElementById("obomnaImage");
const obomnaText = document.getElementById("saying");
const nextButton = document.getElementById("forward");
const backButton = document.getElementById("back");


const obomnaTexts = [
    "hey you!",
    "I've been thinking about what I should do with this war is Syria,",
    "I, current presidant Barack Obama, have decided I want YOU to choose for me!",
    "If any group gains too much power, or if you spend all your budget, you're FIRED.", 
    "Keep you approval high to get more funding!",
];
const imageOrder = [
    3,2,3,0,1
];
const obomnaImages = [
    "O-sad.jpg",
    "O-smile.jpg",
    "O-think.jpg",
    "O-wantsYou.jpg",
];
let current = 0;

// saying.textContent = obomnaTexts[2];
// obomnaImage.src = obomnaImages[3];

function loop() {

    saying.textContent = obomnaTexts[current];
    obomnaImage.src = obomnaImages[imageOrder[current]];

    if (current < imageOrder.length - 1){
        document.getElementById("buttonDiv").style.display = 'none';
    } else {
        document.getElementById("buttonDiv").style.display = '';
    }

    requestAnimationFrame(loop);
}
loop();


nextButton.addEventListener('click', () => {
    if (current < (imageOrder.length - 1)) {
    current++;
    } else {
        alert("press play to continue");
    }
});
backButton.addEventListener('click', () => {
    if (current > 0) {
    current--;
    } else {
        alert("you must go forward before you go back");
    }
=======
const obomnaImage = document.getElementById("obomnaImage");
const obomnaText = document.getElementById("saying");
const nextButton = document.getElementById("forward");
const backButton = document.getElementById("back");


const obomnaTexts = [
    "hey you!",
    "I've been thinking about what I should do with this war is Syria,",
    "I, current presidant Barack Obama, have decided I want YOU to choose for me!",
    "If any group gains too much power, or if you spend all your budget, you're FIRED.", 
    "Keep you approval high to get more funding!",
];
const imageOrder = [
    3,2,3,0,1
];
const obomnaImages = [
    "O-sad.jpg",
    "O-smile.jpg",
    "O-think.jpg",
    "O-wantsYou.jpg",
];
let current = 0;

// saying.textContent = obomnaTexts[2];
// obomnaImage.src = obomnaImages[3];

function loop() {

    saying.textContent = obomnaTexts[current];
    obomnaImage.src = obomnaImages[imageOrder[current]];

    if (current < imageOrder.length - 1){
        document.getElementById("buttonDiv").style.display = 'none';
    } else {
        document.getElementById("buttonDiv").style.display = '';
    }

    requestAnimationFrame(loop);
}
loop();


nextButton.addEventListener('click', () => {
    if (current < (imageOrder.length - 1)) {
    current++;
    } else {
        alert("press play to continue");
    }
});
backButton.addEventListener('click', () => {
    if (current > 0) {
    current--;
    } else {
        alert("you must go forward before you go back");
    }
>>>>>>> second-repo/main
});