const inputName = document.querySelector('#input-text'),
submit = document.querySelector('#submit'),
displayName = document.querySelector('#name'),
buttons = document.querySelectorAll('.buttons button'), 
buttonContainer = document.querySelector('.buttons'), 
pointUser = document.querySelector('.point-user');
pointAi = document.querySelector('.point-ai');
responseAi = document.querySelector('.response-ai');
responseUser = document.querySelector('.response-user');

options =  ['rock','paper','scissors'], 
rules = ["draw", "winner", "loser"]; 

let aiAnswer = "";
let messWelcome = "Welcome: "; 
let userName = ""; 
let userAnswer = ""; 
let result = ""; 
let userScore = 0; 
let aiScore = 0; 

aiAnswer = options[Math.round(Math.random()*2)]; 


inputName.addEventListener('keyup', (e) => {
    userName = e.target.value; 
})

submit.addEventListener('click', (e) => {
    e.preventDefault();
    displayName.innerText = `${messWelcome}  ${userName}`; 
})


const resetPoint= () => {
    aiAnswer = options[Math.round(Math.random()*2)]; 
}

const winner = (userAnswer) => {
    userAnswer; 

    if(userAnswer === "scissors"){
         if(aiAnswer === "paper"){
             userScore++;
             result = rules[1];
         } else if(aiAnswer === "rock") {
             aiScore++;
             result = rules[2];
         } if(aiAnswer === "scissors"){
             result = rules[0]
         }
     }

     if(userAnswer === "rock"){
         if(aiAnswer === "paper"){
             result =  rules[2];
             aiScore++;

         } else if(aiAnswer === "scissors") {
             console.log('AI lose'); 
             userScore++;
             result = rules[1];

         } if(aiAnswer === "rock"){
             result = rules[0]

         }
     }


     if(userAnswer === "paper"){
         if(aiAnswer === "scissors"){
             console.log('AI win'); 
             aiScore++;
             result = rules[2];
         } else if(aiAnswer === "rock") {
             userScore++;
             result = rules[1];
         } else if(aiAnswer === "paper"){
             result = rules[0]

         }
     }
}

const checkScores = () => {
    if(aiScore == 3|| userScore == 3){
        displayName.innerText = `You ${result}, match will automatically restart `; 
        buttonContainer.classList.add('active');
        setTimeout(() => {
            displayName.innerText = `${messWelcome}  ${userName}`; 
            resetGame(); 
        }, 3000)
    }
}

const resetGame = () => {
    buttonContainer.classList.remove('active');
    aiScore = 0;
    userScore = 0; 
    pointUser.innerText = `Your point : ${userScore}`;
    pointAi.innerText = `AI point : ${aiScore}`;
}


const game = () => {
    buttons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            responseAi.innerText = `AI answer :${aiAnswer}`;
            responseUser.innerText = `User answer :${e.currentTarget.id}`;

            winner(e.currentTarget.id);  
            if(result){
                pointUser.innerText = `Your point : ${userScore}`;
                pointAi.innerText = `AI point : ${aiScore}`;
                resetPoint(); 
                checkScores(); 
            }
         }); 
    });
}

game();
