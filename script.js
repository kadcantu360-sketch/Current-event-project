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
        question: "Hey, I heard they requested direct military intervention back in Syria.",
        options: ["Approve direct military intervention.", "Reject Military Intervention"],
    },
    {
        question: "Expanded aid after Russian intervention.",
        options: ["Checks and Balances (Support in response).", "Avoid escalation (Do not aid)."],
    },
    {
        question: "This just in, a paper to provide Anti-tank Weapons to FSA-affiliated group. do we aprove it?",
        options: ["Hey, why not! Improved ability to destroy armored vehicles.", "No! that's dangerous. Anyone? Affiliated?"],
    },
    // {
    //     question: "Should we support all factions despite extremism?",
    //     options: ["Reject due to terrorism concerns.", "Not our problem."],
    // },
    {
        question: "Should we add Training programs to produce fighters?",
        options: ["Strategic Impact is limited anyway, let's just reject it.", "Yes, catch a fish, it'll feed a man for a day, teach him to fish, and he becomes self-sufficient."],
    },
    {
        question: "Should we give the FSA heavy weapons right now?",
        options: ["We should wait till later in the war.", "Yes, we can't wait, winning is priority."],
    },
    {
        question: "In 2016, the FSA had mostly dissolved, and Hay'at Tahrir Al-Sham, or HTS, is now the main force against the Regime.",
        options: ["Continue", "Continue"],
    },
    {
        question: "should we give some financial support to the HTS?",
        options: ["Money's infinite, Lives are not, lets do it!.", "Nah, that money's gonna get wasted on corruption anyway!"],
    },
    {
        question: "We've received a form for a no-fly zone.",
        options: ["Assad ain't bothering nobody. Let's leave him be.", "I mean its just a no-fly zone, why not?"],
    },
    {
        question: "This just in, Chemical Attacks (2013) requested Airstrike retaliation.",
        options: ["Gotta fight fire with fire!", "No, we must remain diplomatic."],
    },
    {
        question: "Continuation of Timber Sycamore.",
        options: ["Continue Support", "End Program"],
    },
    {
        question: "I heard it's time to renew the Aid for Rebel Warehouse Seizures.",
        options: ["It's valuable resources that we should help defend.", "Suspend Aid, it's not that important."],
    },
    {
        question: "It seems the situation in Syria has stabilized enough for a change in power! Help HTS win the War!",
        options: ["Continue", "Continue"],
    },
    {
        question: "Should we add some safe zones for civilians?",
        options: ["Definatly", "Just let them be refugees"],
    },
    {
        question: "I heard there's a directive to improve Communications and Intelligence networks for resistance forces.",
        options: ["Communication is quite important (Approve).", "We've given them enough (Deny)."],
    },
    {
        question: "Well, the war is continuing. Should we have a larger anti-Assad commitment?",
        options: ["Yes, we should finish what we started.", "No, ISIS is a more important priority as it's a terrorist organization."],
    },
    {
        question: "A fresh wepon is hot off the press, should we introduce TOW Missiles?",
        options: ["Dangerous indeed, like a disease once unleashed cannot be taken back", "BGM-71 TOW, an anti-tank tube missile, Useful… for victory."],
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


let reasonForGameOver = 5;


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

let chill=0;





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


    if (reasonForGameOver !== 5 && !window.location.href.includes("gameOver.html") && chill == 0) {
        window.location.href = `gameOver.html?reasonForGameOver=${reasonForGameOver}`;
        chill = 1;
    }

}





function render() {

    // if (reasonForGameOver === 5) {

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
        if (currentQuestion < 7) {
            ctx.fillText("FSA power meter", 170, 79);
        } else {
            ctx.fillText("HTS power meter", 170, 79);
        }
        ctx.fillText("ISIS power meter", 170, 104);
        ctx.fillText(" Bashar al-Assad power meter", 90, 129);

    // }
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

    AssarBar += (barMax - AssarStart) / 12;
    ISISbar += (barMax - ISISstart) / 12;
    budget-= 500000;

    if (currentQuestion+1 === 1) {
        if (optionChosen === 1) {
            FSAbar += (barMax - FSAstart) / 6;
            budget-=50000000;
            syrianRelation += 5;
        } else {
            syrianRelation -= 5;
        }
    } else if (currentQuestion+1 === 2) {
        if (optionChosen === 1) {
            budget-=10000000;
            FSAbar -= (barMax - FSAstart) / 6;
            ISISbar -= (barMax - ISISstart) / 6;
            AssarBar -= (barMax - AssarStart) / 6;
        }
    } else if (currentQuestion+1 === 3) {
        if (optionChosen === 1) {
            budget -= 100000000; 
            syrianRelation += 10;
            FSAbar += (barMax - FSAstart) / 6;
            ISISbar -= (barMax - ISISstart) / 6;
            AssarBar -= (barMax - AssarStart) / 6;
        } else {
            ISISbar += (barMax - ISISstart) / 6;
            AssarBar += (barMax - AssarStart) / 6;
        }
    } else if (currentQuestion+1 === 4) {
        if (optionChosen === 1) {
            syrianRelation += 10;
            FSAbar += (barMax - FSAstart) / 6;
            ISISbar -= (barMax - ISISstart) / 6;
            AssarBar -= (barMax - AssarStart) / 6;
        }
    } else if (currentQuestion+1 === 5) {
        if (optionChosen === 2) {
            budget -= 50000000; 
            syrianRelation += 10;
            FSAbar += (barMax - FSAstart) / 3;
        }
    } else if (currentQuestion+1 === 6) {
        if (optionChosen === 2) {
            budget -= 100000000; 
            FSAbar+=barMax;
        }
    } else if (currentQuestion+1 === 7) { //Should be event rather than question???
        AssarBar -= (barMax - AssarStart) / 12;
        ISISbar -= (barMax - ISISstart) / 12;
        budget+= 1000000;
    } else if (currentQuestion+1 === 8) {
        if (optionChosen === 1) {
            budget -= 100000000; 
            syrianRelation += 100;
            FSAbar += (barMax - FSAstart) / 3;
        }
    } else if (currentQuestion+1 === 9) {
        if (optionChosen === 1) {
            syrianRelation -= 10;
        } else {
            syrianRelation -= 10;
        }
    } else if (currentQuestion+1 === 10) {
        if (optionChosen === 1) {
            budget -= 100000000; 
            FSAbar += (barMax - FSAstart) / 2;
        }
    } else if (currentQuestion+1 === 11) {
        if (optionChosen === 1) {
            budget -= 5000000; 
            syrianRelation += 10;
            FSAbar += (barMax - FSAstart) / 6;
        } else {
            FSAbar -= (barMax - FSAstart) / 3;
        }
    } else if (currentQuestion+1 === 12) {
        if (optionChosen === 1) {
            budget -= 5000000; 
            syrianRelation += 10;
            FSAbar += (barMax - FSAstart) / 6;
        } else {
            FSAbar -= (barMax - FSAstart) / 3;
        }
    } else if (currentQuestion+1 === 13) { // next event???
        AssarBar -= (barMax - AssarStart) / 12;
        ISISbar -= (barMax - ISISstart) / 12;
        budget+= 1000000;
    } else if (currentQuestion+1 === 14) {
        if (optionChosen === 1) {
            budget -= 5000000; 
            syrianRelation += 75;
        } else {
            syrianRelation -= 100;
        }
    } else if (currentQuestion+1 === 15) {
        if (optionChosen === 1) {
            budget -= 10000000; 
            FSAbar += (barMax - FSAstart) / 6;
        }
    } else if (currentQuestion+1 === 16) {
        if (optionChosen === 1) {
            budget -= 1000000; 
            FSAbar += (barMax - FSAstart) / 3;
            AssarBar -= (barMax - AssarStart) / 2;
        } else {
            budget -= 1000000; 
            FSAbar += (barMax - FSAstart) / 3;
            ISISbar -= (barMax - ISISstart) / 2;
        }
    } else if (currentQuestion+1 === 17) {
        if (optionChosen === 1) {
            FSAbar -= (barMax - FSAstart);
            ISISbar -= (barMax - ISISstart);
            AssarBar -= (barMax - AssarStart);
        } else {
            FSAbar += (barMax - FSAstart);
        }
    }
}

function chooseNewQuestion(optionChosen) {
    currentQuestion++;
}

function checkIfGameOver() {
    if (currentQuestion >= 19 || (FSAbar+3 >= barMax && currentQuestion > 7)) {
        reasonForGameOver = 0;
    } else if (budgetPrev <= 0) {
        reasonForGameOver = 1;
    } else if (ISISbar >= barMax || AssarBar >= barMax || FSAbar <= 0) {
        reasonForGameOver = 2;
    } else if (FSAbar >= barMax && currentQuestion < 7){
        reasonForGameOver = 3;
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

// document.addEventListener('keydown', (event) => {
//     if (event.key === '=') {
//         budget *= 10;
//     }
//     if (event.key === '-') {
//         budget /= 10;
//     }

//     if (event.key === 'h') {
//         window.location.href = `gameOver.html?reasonForGameOver=${reasonForGameOver}`;
//     }

// });