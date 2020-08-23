//variable declaration
var scoreboard = document.querySelector('#highscore');
var timerEl = document.querySelector('#seconds');         //timer
var startBtn = document.querySelector('#start-btn');      //start button
var quizQuestionEl = document.querySelector('#question');
var quizWrapper = document.querySelector('#quiz-wrapper');
var quizDivEl = document.querySelector('#quiz');
var createFormEl = document.createElement("form")
var initialInputEl = document.createElement("input")
var finalScoreButtonEl = document.createElement("button")
var quizScoreEl = document.createElement("p")
var finalScoreEl = document.createElement("ul")
var goHomeButtonEl = document.createElement("button")
var clearScoresEl = document.createElement("button")
var currentQuestion = 0
var points = 0;
var timeLeft = 60;

var quizQuestionsArray = [
    {
        question: 'Commonly used data types do NOT include:', 
        choices: ['strings', 'booleans', 'alerts', 'numbers'],
        answer: 'alerts'
    },
    {
        question: 'The condition in an if / else statement is enclosed with ______.', 
        choices: ['quotes', 'curly brackets', 'parenthesis', 'square brackets'],
        answer: 'parenthesis'
    },
    {
        question: 'Arrays in JavaScript can be used to store', 
        choices: ['numbers and strings', 'other arrays', 'booleans', 'all of the above'],
        answer: 'all of the above'
    },
    {
        question: 'String values must be enclosed within ____ when being assigned to variables', 
        choices: ['commas', 'curly brakcets', 'quotes', 'parenthesis'],
        answer: 'quotes'
    },
    {
        question: null,
        choices: ''
    },

]

var startQuiz = function () {
    var quests = quizQuestionsArray[currentQuestion].question;
    var currentAns = quizQuestionsArray[currentQuestion].choices;
    var ulEl = document.createElement("ul");

    countdownTimer();

    quizDivEl.innerHTML = '';
    
    for (var i = 0; i < currentAns.length; i++) {
        if (i < currentAns.length) {
            // generate list and button
            var liEl = document.createElement("li");
            var buttonEl = document.createElement("button");
            // set buttons text to current choices
            buttonEl.textContent = currentAns[i];
            //set value of button to the index of the answer
            buttonEl.setAttribute("value", i);
            buttonEl.setAttribute("id", "answer-id");
            // connect button to list and list to unordered list
            liEl.appendChild(buttonEl);
            ulEl.appendChild(liEl);
            buttonEl.onclick = buttonClick;
        }

    };

    if (quests === null) {
        highScore()
    }

    quizDivEl.appendChild(ulEl)

    quizQuestionEl.textContent = quests

};

function buttonClick() {
    if (this.value === quizQuestionsArray[currentQuestion].answer.toString()) {
        currentQuestion++;
        timeLeft = timeLeft - 0;
        startQuiz();
    } else {
        timeLeft = timeLeft - 10;
        currentQuestion++;
        startQuiz();
    }
};


function countdownTimer() {
    var timeInterval = setInterval(function () {

        if (timeLeft > 1) {
            timerEl.textContent = timeLeft + ' seconds left';
            timeLeft--;
        } else if (timeLeft === 1) {
            timerEl.textContent = timeLeft;
            timeLeft--;
        } else if (quizQuestionsArray[currentQuestion].question === null) {
            clearInterval(timeInterval);
        } else if (timeLeft === 0) {
            quizQuestionEl.textContent = 'Quiz Complete!';
            quizDivEl.innerHTML = '';
            clearInterval(timeInterval);
            return highScore();
        } else {
            timerEl.textContent = '';
            clearInterval(timeInterval);
        }
    }, 1000);
}


var showQuestion = function (answerInd) {
    if (quizQuestionsArray[currentQuestion].answer == answerInd) {
        currentQuestion++
        startQuiz()
    } else {
        currentQuestion++
        startQuiz()
    }

}

var highScore = function () {

    quizScoreEl.textContent = "You scored " + points + " points!";
    quizScoreEl.setAttribute("id", "score-id")
    createFormEl.appendChild(initialInputEl)

    finalScoreButtonEl.onclick = function () { finalScore(initialInputEl) };
    finalScoreButtonEl.textContent = "Submit Your Score"
    finalScoreButtonEl.setAttribute("id", "submit-id")

    //sets attribute to initial input of high score set
    initialInputEl.setAttribute("type", "text")
    initialInputEl.setAttribute("placeholder", "Enter Initials")
    initialInputEl.setAttribute("id", "form-id")

    //adds to quiz div
    quizDivEl.appendChild(quizScoreEl)
    quizDivEl.appendChild(createFormEl)
    quizDivEl.appendChild(finalScoreButtonEl)

}

var finalScore = function (initialInputEl) {
    quizDivEl.innerHTML = ' ';
    var newScore = {
        points: points,
        name: initialInputEl.value
    }

    var scoresArray = JSON.parse(localStorage.getItem("highScores"))
    if (scoresArray == null) {
        scoresArray = []
    }
    
    scoresArray.push(newScore)
    localStorage.setItem("highScores", JSON.stringify(scoresArray));
    finalScoreEl.innerHTML = '';
    for (var i = 0; i < scoresArray.length; i++) {
        finalScoreEl.innerHTML += `<li id="final-hi-id">${scoresArray[i].name} - ${scoresArray[i].points}</li>`
    }

    quizQuestionEl.textContent = "Leaderboard";
    goHomeButtonEl.textContent = "Home";
    clearScoresEl.textContent = "Clear Scores";
    goHomeButtonEl.setAttribute("id", "home-bt-id");
    goHomeButtonEl.setAttribute("onclick", "location.reload()");
    clearScoresEl.setAttribute("id", "home-bt-id")
    clearScoresEl.setAttribute("onclick", "localStorage.clear()");
    quizDivEl.appendChild(finalScoreEl)
    quizDivEl.appendChild(goHomeButtonEl)
    quizDivEl.appendChild(clearScoresEl)
};

//starts quiz
startBtn.addEventListener("click", startQuiz);
//takes to leaderboard
scoreboard.addEventListener("click", finalScore);