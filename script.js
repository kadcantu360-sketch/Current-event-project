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
        options: ["Yes CIA should arm and train vetted rebel groups,", "No high possibility of defections or misuse of training/information,"],
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

let budget = 130000000; //130 million = 130000000
const wordForMoneyScaleList = ["", "thousand", "million", "billion", "trillion", "quadrillion"];
let wordForMoneyScale = "not loaded yet";
let budgetFirstDigits = 0;

let syrianRelation = 0;

// let citizenApproval = 0;

let FSAbar = 70;
let ISISbar = 50;
let AssarBar = 140;





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
    
    ctx.fillText('budget: $' + budgetFirstDigits + ' ' + wordForMoneyScale, 5, 25);
    ctx.fillText('how is your relation with Syria: ' + syrianRelation, 5, 45);
    // ctx.fillText('How much do your citizens approve you?: ' + citizenApproval, 5, 60);

    ctx.fillStyle = '#ff0000';

    ctx.fillRect(10,67,FSAbar ,22);
    ctx.strokeRect(10,67,275,22);
    

    ctx.fillRect(10,92,ISISbar ,22);
    ctx.strokeRect(10,92,275,22);


    ctx.fillRect(10,117,AssarBar ,22);
    ctx.strokeRect(10,117,275,22);

    ctx.fillStyle = '#000000';
    ctx.textBaseline = 'middle';
    ctx.fillText("FSA power meter", 170, 79);
    ctx.fillText("ISIS power meter", 170, 104);
    ctx.fillText(" Bashar al-Assad power meter", 90, 129);


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
    if (currentQuestion === 0) {
        if (optionChosen === 1) {
            FSAbar += 10;
            syrianRelation += 5;
        } else {
            AssarBar += 10;
            syrianRelation -= 5;
        }
    } else if (currentQuestion === 1) {
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
    // if (currentQuestion === 1) {
    //     if (optionChosen === 1) {
    //         currentQuestion = 2;
    //     } else {
    //         currentQuestion = 3;
    //     }
    // } else {
    currentQuestion = (currentQuestion + 1) % questions.length;
    // }
}





button1.addEventListener('click', () => {
    oldManConsequences(1);
    chooseNewQuestion(1);
});

button2.addEventListener('click', () => {
    oldManConsequences(2);
    chooseNewQuestion(2);
});
