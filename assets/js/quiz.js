//variable declaration
var scoreboard = document.querySelector('#highscore');
var timerEl = document.querySelector('#seconds');         //timer
var startBtn = document.querySelector('#start-btn');      //start button
var quizQuestionEl = document.querySelector('#question');
var quizWrapper = document.querySelector('#quiz-wrapper');
var quizDivEl = document.querySelector('#quiz');
var createFormEl = document.createElement('form');
var initialInputEl = document.createElement('input');
var finalScoreButtonEl = document.createElement('button');
var quizScoreEl = document.createElement('p');
var finalScoreEl = document.createElement('ul');
var goHomeButtonEl = document.createElement('button');
var clearScoresEl = document.createElement('button');
var currentQuestion = 0;
var timeLeft = 60;
var points = timeLeft;

//array declaration
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

function startQuiz() {
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
        highScore();
    }

    quizDivEl.appendChild(ulEl);

    quizQuestionEl.textContent = quests;

};

function buttonClick() {
    if (this.value === quizQuestionsArray[currentQuestion].answer.toString()) {
        currentQuestion++;
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

        } 
        else if (quizQuestionsArray[currentQuestion].question === null) {
            
            
            quizDivEl.innerHTML = '';
            return highScore();
        }
        else if (timeLeft === 1) {
            timerEl.textContent = timeLeft + ' second left';
            timeLeft--;
        } 
        else if (timeLeft === 0) {
            clearInterval(timeInterval);
        }
         else {
            timerEl.textContent = '';
            clearInterval(timeInterval);
        }
    }, 1000);
}


function showQuestion(answerInd) {
    if (quizQuestionsArray[currentQuestion].answer == answerInd) {
        currentQuestion++;
        startQuiz();
    } else {
        currentQuestion++;
        startQuiz();
    }

}

function highScore() {
    quizScoreEl.textContent = "You scored " + points + " points!";
    quizScoreEl.setAttribute("id", "score-id");
    createFormEl.appendChild(initialInputEl);

    finalScoreButtonEl.onclick = function () { finalScore(initialInputEl) };
    finalScoreButtonEl.textContent = "Submit Your Score";
    finalScoreButtonEl.setAttribute("id", "submit-id");

    //sets attribute to initial input of high score set
    initialInputEl.setAttribute("type", "text");
    initialInputEl.setAttribute("placeholder", "Enter Initials");
    initialInputEl.setAttribute("id", "form-id");
   
    //adds to quiz div
    quizDivEl.appendChild(quizQuestionEl)
    quizDivEl.appendChild(quizScoreEl)
    quizDivEl.appendChild(createFormEl)
    quizDivEl.appendChild(finalScoreButtonEl)
    
}

function finalScore(initialInputEl) {
    quizDivEl.innerHTML = ' ';
    console.log(quizDivEl);
    var newScore = {
        points: timeLeft,
        name: initialInputEl.value
    };

    var scoreArray = JSON.parse(localStorage.getItem("highScores"))
    if (scoreArray == null) {
        scoreArray = [];
    };

    scoreArray.push(newScore);
    localStorage.setItem("highScores", JSON.stringify(scoreArray));
    finalScoreEl.innerHTML = '';

    for (var i = 0; i < scoreArray.length; i++) {
        finalScoreEl.innerHTML += `<li id="final-score-id">${scoreArray[i].name} - ${scoreArray[i].points}</li>`;
    };

    quizQuestionEl.innerHTML = '<div id="leaderboard-header-id">Leaderboard</div>';
    //button to go home, sets attributes and id, onclick it reloads browser
    goHomeButtonEl.textContent = 'Home';
    goHomeButtonEl.setAttribute("id", "home-btn");
    goHomeButtonEl.setAttribute("onclick", "location.reload()");
    //button to clear scoreboard, set attributes and id, click clears local storage
    clearScoresEl.textContent = 'Clear Scores';
    clearScoresEl.setAttribute("id", "home-btn");
    clearScoresEl.setAttribute("onclick", "localStorage.clear()");
    //appends each element to the quiz div
    quizDivEl.appendChild(finalScoreEl);
    quizDivEl.appendChild(goHomeButtonEl);
    quizDivEl.appendChild(clearScoresEl);
};

function scoreboardView() {
    //hides start btn when accessing leaderboard from home
    startBtn.setAttribute('class', 'hide');

    //gets highscore
    var scoreArray = JSON.parse(localStorage.getItem("highScores"))
    if (scoreArray == null) {
        scoreArray = [];
    };

    for (var i = 0; i < scoreArray.length; i++) {
        finalScoreEl.innerHTML += `<li id="final-score-id">${scoreArray[i].name} - ${scoreArray[i].points}</li>`
    };

    quizQuestionEl.innerHTML = '<div id="leaderboard-header-id">Leaderboard</div>';
    //button to go home, sets attributes and id, onclick it reloads browser
    goHomeButtonEl.textContent = 'Home';
    goHomeButtonEl.setAttribute("id", "home-btn");
    goHomeButtonEl.setAttribute("onclick", "location.reload()");
    //button to clear scoreboard, set attributes and id, click clears local storage
    clearScoresEl.textContent = 'Clear Scores';
    clearScoresEl.setAttribute("id", "home-btn");
    clearScoresEl.setAttribute("onclick", "localStorage.clear()");
    //appends each element to the quiz div
    quizDivEl.appendChild(finalScoreEl);
    quizDivEl.appendChild(goHomeButtonEl);
    quizDivEl.appendChild(clearScoresEl);
}

//starts quiz
startBtn.addEventListener("click", startQuiz);
//takes to leaderboard
scoreboard.addEventListener("click", scoreboardView);