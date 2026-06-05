const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.fillRect(20,20,20,20);

const originalWidth = 300;
const originalHeight = 150;

const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');





const questions = [
    {
        question: 'Our first mission for you today, Operation Timber Sycamore. Should we arm and train rebel groups?',
        options: ["Yes CIA should arm and train vetted rebel groups,", "No high possibility of defections or misuse of training / information,"],
    },
    {
        question: "2example",
        options: ["1", "2"],
    },
    {
        question: "3example",
        options: ["1", "2"],
    },
    {
        question: "This just in, a paper to provide Anti-tank Weapons to FSA-affiliated group. do we aprove it?",
        options: ["Hey, why not! Improved ability to destroy armored vehicles.", "No! that's dangerous. Anyone? Affiliated?"],
    },
    {
        question: "5example",
        options: ["1", "2"],
    },
    {
        question: "6example",
        options: ["1", "2"],
    },
    {
        question: "7example",
        options: ["1", "2"],
    },
    {
        question: "should we give some financial support?",
        options: ["Money's infinite, Lives are not, lets do it!.", "Nah, that money's gonna get wasted on corruption anyway!"],
    },
    {
        question: "9example",
        options: ["1", "2"],
    },
    {
        question: "This just in, it is now decided the FSA should be the winners of the war. From now on, rather than keeping the powers in balance, push for FSA to win!",
        options: ["lets do it!", "Now or never!"],
    },
];
let currentQuestion = 0;

let budget = 130000000; //130 million = 130000000
let budgetPrev = budget;
const wordForMoneyScaleList = ["", "thousand", "million", "billion", "trillion", "quadrillion"];
let wordForMoneyScale = "not loaded yet";
let budgetFirstDigits = 0;

let syrianRelation = 0;
let syrianRelationPrev = syrianRelation;


let FSAstart = 70;
let ISISstart = 50;
let AssarStart = 140;

let FSAbarPrev = FSAstart;
let ISISbarPrev = ISISstart;
let AssarBarPrev = AssarStart;

let FSAbar = FSAstart;
let ISISbar = ISISstart;
let AssarBar = AssarStart;

let barMax = 275;





function update() {

    FSAbarPrev = (FSAbar + FSAbarPrev * 19)/20;
    ISISbarPrev = (ISISbar + ISISbarPrev * 19)/20;
    AssarBarPrev = (AssarBar + AssarBarPrev * 19)/20;
    budgetPrev = (budget + budgetPrev * 19)/20;
    syrianRelationPrev = Math.ceil((syrianRelation + syrianRelationPrev * 19) / (20 / 100)) / 100;

    wordForMoneyScale = wordForMoneyScaleList[Math.floor(Math.log10(budgetPrev) / 3)];
    budgetFirstDigits = Number((budgetPrev / Math.pow(1000, Math.floor(Math.log10(budgetPrev) / 3))).toFixed(2));

    showQuestionAndOptions();

    checkIfGameOver();
    
}





function render() {

    ctx.font = '14px Arial';
    ctx.fillStyle = '#000000';
    
    ctx.fillText('budget: $' + budgetFirstDigits + ' ' + wordForMoneyScale, 5, 25);
    ctx.fillText('how is your relation with Syria: ' + Math.floor(syrianRelationPrev), 5, 45);



    ctx.fillStyle = '#ffa0a0';

    ctx.fillRect(10,67,FSAbar ,22);
    ctx.strokeRect(10,67,275,22);
    

    ctx.fillRect(10,92,ISISbar ,22);
    ctx.strokeRect(10,92,275,22);


    ctx.fillRect(10,117,AssarBar ,22);
    ctx.strokeRect(10,117,275,22);



    ctx.fillStyle = '#ff0000';

    ctx.fillRect(10,67,FSAbarPrev, 22);
    ctx.strokeRect(10,67,275,22);
    

    ctx.fillRect(10,92,ISISbarPrev, 22);
    ctx.strokeRect(10,92,275,22);


    ctx.fillRect(10,117,AssarBarPrev, 22);
    ctx.strokeRect(10,117,275,22);


    ctx.fillStyle = '#000000';
    ctx.textBaseline = 'middle';
    ctx.fillText("FSA power meter", 170, 79);
    ctx.fillText("ISIS power meter", 170, 104);
    ctx.fillText(" Bashar al-Assad power meter", 90, 129);

}





function mainLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    scaleCanvasAndSaveContentScale();
    update();
    render();
    applyContentScaling();
    requestAnimationFrame(mainLoop);
}
mainLoop();





function scaleCanvasAndSaveContentScale() {
    canvas.width = window.innerWidth - 2 * canvas.offsetLeft;
    if (canvas.width > 700){
        canvas.width = 700;
    }
    canvas.height = canvas.width / 2;   
    ctx.save();
    const scaleFromWidth = canvas.width / originalWidth;
    ctx.scale(scaleFromWidth, scaleFromWidth);
}

function applyContentScaling() {
    ctx.restore();
}

function showQuestionAndOptions() {
    document.getElementById('question').textContent = questions[currentQuestion].question;
    document.getElementById('button1').textContent = questions[currentQuestion].options[0];
    document.getElementById('button2').textContent = questions[currentQuestion].options[1];
}

function oldManConsequences(optionChosen) {

    budget-= budget / 10;

    if (currentQuestion+1 === 1) {
        if (optionChosen === 1) {
            FSAbar += (barMax - FSAstart) / 3;
            syrianRelation += 5;
        } else {
            AssarBar += (barMax - AssarStart) / 6;
            syrianRelation -= 5;
        }
    } else if (currentQuestion+1 === 4) {
        if (optionChosen === 1) {
            syrianRelation += 5;
            FSAbar += (barMax - FSAstart) / 6;
        } else {
            ISISbar += (barMax - ISISstart) / 2;
        }
    } else if (currentQuestion+1 === 8) {
        if (optionChosen === 1) {
            budget -= 1000000; 
            syrianRelation += 10;
            FSAbar += (barMax - FSAstart) / 3;
        } else {
            ISISbar += 100;
        }
    } else {
        alert("This question doesn't have consequences coded in yet, but it will be added in the future! For now, just click the button to move on to the next question.");
    }        
}

function chooseNewQuestion(optionChosen) {
    currentQuestion = (currentQuestion + 1) % questions.length;
}

function checkIfGameOver() {
    if (budget <= 0) {
        window.location.href = "gameOver.html";
    }
}





button1.addEventListener('click', () => {
    oldManConsequences(1);
    chooseNewQuestion(1);
});

button2.addEventListener('click', () => {
    oldManConsequences(2);
    chooseNewQuestion(2);
});

document.addEventListener('keydown', (event) => {
    if (event.key === '=') {
        budget *= 10;
    }
    if (event.key === '-') {
        budget /= 10;
    }
});