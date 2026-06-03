const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.fillRect(20,20,20,20);

const originalWidth = 300;
const originalHeight = 150;

const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');





const questions = [
    {
        question: "example question 1",
        options: ["option 1", "option 2"],
    },
    {
        question: "Syria is requesting funds, will you donate?",
        options: ["yes", "no"],
    },
    {
        question: "how much will you donate?",
        options: ["$1000", "$5000"],
    },
    {
        question: "another example",
        options: ["1", "2"],
    },
    {
        question: "will you kill assad",
        options: ["nuke em", "say that you will but dont actually do it"],
    },
];
let currentQuestion = 0;

let budget = 13769; //130 million = 130000000
const wordForMoneyScaleList = ["", "thousand", "million", "billion", "trillion", "quadrillion"];
let wordForMoneyScale = "not loaded yet";
let budgetFirstDigits = 0;

let syrianRelation = 0;

let citizenApproval = 0;

let FSAbar = 10;
let ISISbar = 0;
let AssarBar = 0;





function update() {

    if (budget < 0) {
        budget = 0;
    }

    wordForMoneyScale = wordForMoneyScaleList[Math.floor(Math.log10(budget) / 3)];
    budgetFirstDigits = Number((budget / Math.pow(1000, Math.floor(Math.log10(budget) / 3))).toFixed(2));
    
    showQuestionAndOptions();
    
}







function render() {

    ctx.font = '14px Arial';
    ctx.fillStyle = '#000000';
    
    ctx.fillText('budget: $' + budgetFirstDigits + ' ' + wordForMoneyScale, 5, 20);
    ctx.fillText('how is your relation with Syria: ' + syrianRelation, 5, 40);
    ctx.fillText('How much do your citizens approve you?: ' + citizenApproval, 5, 60);

    ctx.fillStyle = '#ff0000';

    ctx.fillRect(10,72,10 + FSAbar ,22);
    ctx.strokeRect(10,72,275,22);
    

    ctx.fillRect(10,97,10 + ISISbar ,22);
    ctx.strokeRect(10,97,275,22);


    ctx.fillRect(10,122,10 + AssarBar ,22);
    ctx.strokeRect(10,122,275,22);

    ctx.fillStyle = '#000000';
    ctx.textBaseline = 'middle';
    ctx.fillText("FSA power meter", 170, 83);
    ctx.fillText("ISIS power meter", 170, 108);
    ctx.fillText(" Bashar al-Assad power meter", 90, 133);


    // ctx.stroke(10,10,20,20);
    // ctx.fill();
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
    if (currentQuestion === 1) {
        if (optionChosen === 1) {
            syrianRelation += 5;
        } else {
            syrianRelation -= 150;
        }
    } else if (currentQuestion === 2) {
        if (optionChosen === 1) {
            budget -= 1000; 
            syrianRelation += 10;
        } else {
            budget -= 5000;
            syrianRelation += 100;
        }
    }
}

function chooseNewQuestion(optionChosen) {
    if (currentQuestion === 1) {
        if (optionChosen === 1) {
            currentQuestion = 2;
        } else {
            currentQuestion = 3;
        }
    } else {
        currentQuestion = (currentQuestion + 1) % questions.length;
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