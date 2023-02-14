const inputName = document.querySelector('#input-text'),
    submit = document.querySelector('#submit'),
    displayName = document.querySelector('#name'),
    buttons = document.querySelectorAll('.buttons button'),
    buttonContainer = document.querySelector('.buttons'),
    container = document.querySelector('.container'),

    pointUser = document.querySelector('.point-user');
pointAi = document.querySelector('.point-ai');
responseAi = document.querySelector('.response-ai');
responseUser = document.querySelector('.response-user');
const highscoreContainer = document.querySelector('.highScore');


options = ['rock', 'paper', 'scissors'],
    rules = ["draw", "winner", "loser"];

let aiAnswer = "";
let messWelcome = "Welcome: ";
let userName = "";
let userAnswer = "";
let result = "";
let userScore = 0;
let aiScore = 0;

let objData = {
    name: "",
    score: 0
};


aiAnswer = options[Math.round(Math.random() * 2)];


inputName.addEventListener('keyup', (e) => {
    userName = e.target.value;
})

if (userName) {
    container.classList.add('show');
} else {
    container.classList.remove('show');
}

submit.addEventListener('click', (e) => {
    e.preventDefault();
    displayName.innerText = `${messWelcome}  ${userName}`;

    if (userName) {
        container.classList.add('show');
    } else {
        container.classList.remove('show');
    }
    objData.name = userName;
})


const resetPoint = () => {
    aiAnswer = options[Math.round(Math.random() * 2)];
}

const winner = (userAnswer) => {
    userAnswer;

    if (userAnswer === "scissors") {
        if (aiAnswer === "paper") {
            userScore++;
            objData.score = userScore;
            postScore(objData);
            displayName.innerText = `User win + 1 point`;
            result = rules[1];
        } else if (aiAnswer === "rock") {
            userScore = 0;
            displayName.innerText = `User lose, reset point`;

            result = rules[2];
        } if (aiAnswer === "scissors") {
            result = rules[0]
            displayName.innerText = `No one wins`;

        }
    }

    if (userAnswer === "rock") {
        if (aiAnswer === "paper") {
            result = rules[2];
            userScore = 0;
            displayName.innerText = `User lose, reset point`;

        } else if (aiAnswer === "scissors") {
            console.log('AI lose');
            userScore++;
            displayName.innerText = `User win + 1 point`;
            objData.score = userScore;
            postScore(objData);
            result = rules[1];

        } if (aiAnswer === "rock") {
            result = rules[0]
            displayName.innerText = `No one wins`;

        }
    }


    if (userAnswer === "paper") {
        if (aiAnswer === "scissors") {
            console.log('AI win');
            userScore = 0;
            displayName.innerText = `User lose, reset point`;
            result = rules[2];
        } else if (aiAnswer === "rock") {
            userScore++;
            displayName.innerText = `User win + 1 point`;
            objData.score = userScore;
            postScore(objData);
            result = rules[1];
        } else if (aiAnswer === "paper") {
            result = rules[0]
            displayName.innerText = `No one wins`;

        }
    }
    resetPoint();
    getScoreList();
}


// const checkScores = () => {
//     if (aiScore == 3 || userScore == 3) {
//         displayName.innerText = `You ${result}, match will automatically restart `;
//         buttonContainer.classList.add('active');
//         setTimeout(() => {
//             displayName.innerText = `${messWelcome}  ${userName}`;
//             resetGame();
//         }, 3000)
//     }
// }



const game = () => {
    buttons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            responseAi.innerText = `AI answer :${aiAnswer}`;
            responseUser.innerText = `User answer :${e.currentTarget.id}`;

            winner(e.currentTarget.id);
            if (result) {
                pointUser.innerText = `Your point : ${userScore}`;
                pointAi.innerText = `AI point : ${aiScore}`;
                resetPoint();
                checkScores();
            }
        });
    });
}

// REST API Utils 

function compare(a, b) {
    if (a.score < b.score) {
        return 1;
    }
    if (a.score > b.score) {
        return -1;
    }
    return 0;
}

// Get Score List 

const url = "https://sten-sax-pase-74a1b-default-rtdb.europe-west1.firebasedatabase.app/highscore.json";

const getScoreList = async () => {

    const response = await fetch(url);
    const players = await response.json();

    if (document.querySelectorAll('.player')) {
        document.querySelectorAll('.player').forEach(el => el.remove())
    }

    Object.values(players).sort(compare).splice(0, 5).map((player, index) => {
        let element = `
                    <tr class="player">
                        <td>${++index}</td>
                        <td>${player.name}</td>
                        <td>${player.score}</td>
                     </tr>
                `;

        highscoreContainer.innerHTML += element;
    });

}

// POST SCORE 

const postScore = (data) => {
    fetch('https://sten-sax-pase-74a1b-default-rtdb.europe-west1.firebasedatabase.app/highscore.json', {
        method: "POST",
        headers: { "Content-type": "application/json;charset=UTF-8" },
        body: JSON.stringify(data),
    })
}

game();
getScoreList(); 