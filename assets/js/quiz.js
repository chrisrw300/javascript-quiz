//variable declarations
const highscoresEl = document.querySelector('#scoreboard-page');
const highscoresBtn = document.querySelector('#highscore');
const homepageEl = document.querySelector('#homepage');
const quizEl = document.querySelector('#quiz-wrapper');
const inputScoreEl = document.querySelector('#input-score');
//quiz declarations
const quizQuestEl = document.querySelector('#question');
const choiceA = document.querySelector('#choice-a');
const choiceB = document.querySelector('#choice-b');
const choiceC = document.querySelector('#choice-c');
const choiceD = document.querySelector('#choice-d');
//button declarations
const startBtn = document.querySelector('#start-btn');
const homeBtn = document.querySelector('#home-btn');
const clearBtn = document.querySelector('#clear-hs');
//timer
const timerEl = document.querySelector('#seconds');
let timeLeft = 60;
//quiz question array
var questions = [
    {
        question: "Commonly used data types DO NOT include:",
        choiceA: "Strings",
        choiceB: "Booleans",
        choiceC: "Alerts",
        choiceD: "Numbers",
        correct: "C"
    },
    {
        question: "The condition in an if/else statement is enclosed with _____.",
        choiceA: "Quotes",
        choiceB: "Curly Brackets",
        choiceC: "Parentheses",
        choiceD: "Square brackets",
        correct: "C"
    },
    {
        question: "Arrays in JavaScript can be used to store ______",
        choiceA: "Numbers and Strings",
        choiceB: "Other Arrays",
        choiceC: "Booleans",
        choiceD: "All of the above",
        correct: "D"
    },
    {
        question: "String values must be enclosed with _____ when being assigned to variables.",
        choiceA: "Commas",
        choiceB: "Curly Brackets",
        choiceC: "Quotes",
        choiceD: "Parentheses",
        correct: "C"
    },
    {
        question: "A very useful tool during development and debugging for printing content to the debugger is:",
        choiceA: "JavaScript",
        choiceB: "Terminal/bash",
        choiceC: "For Loops",
        choiceD: "console.log",
        correct: "D"
    }
]
//set last question, current question, and initial score
var endQuestion = questions.length -1;
var currentQuestion = 0;
let score = 0;

//countdown
function countdownTimer() {
    var timeInt = setInterval(function() {
        if (timeLeft > 0) {
            timerEl.textContent = `${timeLeft} seconds`;
            timeLeft--;
        } else if (timeLeft === 1) {
            timerEl.textContent = `${timeLeft} second`;
        } else if (timeLeft === 0) {
            timerEl.textContent = `${timeLeft} seconds`;
            clearInterval(timeInt);
            alert('You ran out of time!');
            showScore();
        }
    }, 1000);
}

//load questions
function loadQuestions() {
    let quest = questions[currentQuestion];
    question.innerHTML = `<p> ${quest.question} </p>`;
    choiceA.innerHTML = quest.choiceA;
    choiceB.innerHTML = quest.choiceB;
    choiceC.innerHTML = quest.choiceC;
    choiceD.innerHTML = quest.choiceD;
}

//verify selected answer is correct
function verifyAns(answer) {
    if (answer === questions[currentQuestion].correct) {
        score++;
        console.log('correct!');
    } else {
        console.log(`the correct answer was ${questions[currentQuestion].correct}!`);
        timeLeft = timeLeft - 10;
    }
    if (currentQuestion < endQuestion) {
        currentQuestion++;
        loadQuestions();
    } else {
        finalScore();
        timeLeft = 99999999;
        timerEl.style.display = 'none';
    }
}

//start quiz
function startQuiz() {
    //begin timer
    countdownTimer();
    //hide homepage
    homepageEl.style.display = 'none';
    //get questions
    loadQuestions();
    //show quiz div
    quizEl.style.display = 'block';
}

//show final score
function finalScore() {
    quizEl.style.display = 'none';
    inputScoreEl.style.display = 'block';
    let endScore = timeLeft;
    document.querySelector("#final-score").innerHTML = `Your Final Score is ${endScore}`;
    localStorage.setItem("userScore", JSON.stringify(endScore));
}

//local storage 
const inputInitials = document.querySelector('#input-initials');
const scoreList = document.querySelector('#current-hs');
const submit = document.querySelector('#submit');

//display scoreboard page
function highscorePage() {
    homepageEl.style.display = 'none';
    quizEl.style.display = 'none';
    inputScoreEl.style.display = 'none';
    highscoresEl.style.display = 'block';

    //get local storage items
    for (let i = 0; i < localStorage.length; i++) {
        var userName = localStorage.getItem('userInitials');
        var userPoints = localStorage.getItem('userScore');
        userPoints = JSON.parse(userPoints);

        var createLi = document.createElement('li');
        var userLi = document.createTextNode(`${userName} - ${userPoints}`);
        createLi.appendChild(userLi);
        document.querySelector('#current-hs').appendChild(createLi);
    }
}

//event listener to start quiz
startBtn.addEventListener('click', startQuiz);
//view highscores from home
highscoresBtn.addEventListener('click', highscorePage);
//sets initials and score in local storage
submit.addEventListener('click', function (event) {
    //stores high score in local storage
    localStorage.setItem('userInitials', inputInitials.value);
    highscorePage();
})
//clear scores
clearBtn.addEventListener('click', function() {
    localStorage.clear();
    alert('Scores have been cleared!');
})
//go home
homeBtn.addEventListener('click', function() {
    location.reload();
    return false;
})