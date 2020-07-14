// giving variables for the element
var containerDiv = document.querySelector(".container");
var startButton = document.querySelector("#start-btn");
var nextButton = document.querySelector("#next-btn");
var restartButton = document.querySelector("#restart");
var questionContainerEl = document.querySelector("#question-container");
var questionEl = document.querySelector("#question");
var answerButtonsEl = document.querySelector("#answer-buttons");
var scoreDivEl = document.querySelector("#score");
var scoreEl = document.querySelector(".score-number");
var highScoreEl = document.querySelector(".high-score");
var textHighScore = document.querySelector(".text-high-score");
var submitBtn = document.querySelector(".a1");
var timerEl = document.querySelector(".timer");
var userEl = document.querySelector(".user");
// set variables for the functions
var shuffledQuestions;
var currentQuestionIndex;
var questionTimer;
// for score count and display
var score = 0;
// for time conut and display
var seconds = 180; // 180 s

// timer function
function countdown() {
    questionTimer = setInterval(function() {
        seconds--;
        timerEl.textContent = `Time left: ${seconds} s`;
        if(seconds <= 1) {
            timerEl.textContent = "Time left: 0";
            console.log("Time's up");
            clearInterval(questionTimer);
            containerDiv.classList.add("hide");
            restartButton.classList.remove("hide");
            scoreDivEl.classList.remove("hide");
            textHighScore.classList.remove("hide");
            scoreEl.innerText = score;
            HighScore();
        }
    }, 1000);
}


// function for start button
// function to make questions array random
function startGame() {
    containerDiv.classList.remove("hide");
    restartButton.classList.add("hide");
    scoreDivEl.classList.add("hide");
    startButton.classList.add("hide");
    textHighScore.classList.add("hide");
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    score = 0;
    seconds = 180;
    questionContainerEl.classList.remove("hide");
    countdown();
    setNextQuestion();
    HighScore();
}
// function for next button
function nextQuestionBtn() {
    currentQuestionIndex++;
    setNextQuestion();
}
function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}
function showQuestion(q) {
    questionEl.innerText = q.question;
    q.answer.forEach(answer => {
        var button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtonsEl.appendChild(button);
    });
}
function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add("hide");
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild);
    }
}
// function for check the answer
function selectAnswer(e) {
    var selectedBtn = e.target;
    var correct = selectedBtn.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    });
    if (correct) {
        score++;
    } else if (correct != true) {
        timerEl.innerText = `Time left: ${seconds} -15 second`
        seconds -= 15;
    }
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide");
    } else {
        containerDiv.classList.add("hide");
        restartButton.classList.remove("hide");
        scoreDivEl.classList.remove("hide");
        textHighScore.classList.remove("hide");
        scoreEl.innerText = score;
        seconds = 0;
    }

}
// function to change the class depends on the answer
function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");
    }
}
function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
}
// set local storage
function postQuiz() {
    localStorage.setItem("user", highScoreEl.value);
    localStorage.setItem("score", score);
    console.log(highScoreEl.value, score);
    alert("score submit!");
}
// get local storage and display
function HighScore() {
    document.querySelector("#user").innerHTML = localStorage.getItem("user") + "/" + localStorage.getItem("score");
    console.log(userEl);
}

// event listener to call the function
restartButton.addEventListener("click", startGame);
startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", nextQuestionBtn);
submitBtn.addEventListener("click", postQuiz);
// questions array
var questions = [
    {
        question: "During WWII one of the most famous codes was broken at Bletchley Park. What code was it?",
        answer: [
            {text: "Enigma Code", correct: true},
            {text: "Secret Hitler", correct: false},
            {text: "Edelweiss", correct: false},
            {text: "German Mystery", correct: false}
        ]
    },
    {
        question: "What is the name of the statement that is used to exit or end a loop in Javascript?",
        answer: [
            {text: "Close statement", correct: false},
            {text: "Break statement", correct: true},
            {text: "Conditional statement", correct: false},
            {text: "Falter statement", correct: false},
        ]
    },
    {
        question: "What is the element used – and hidden – in code that explains things and makes the content more readable in Javascript?",
        answer: [
            {text: "Quotations", correct: false},
            {text: "Notes", correct: false},
            {text: "Comments", correct: true},
            {text: "Comparisons", correct: false}
        ]
    },
    {
        question: "Who is the slowest animal on the list?",
        answer: [
            {text: "Tortoise", correct: false},
            {text: "Sloth", correct: true},
            {text: "Turtle", correct: false},
            {text: "Hores", correct: false}
        ]
    },
    {
        question: "2 + 2 = ?",
        answer: [
            {text: "4", correct: true},
            {text: "2", correct: false},
            {text: "8", correct: false},
            {text: "22", correct: false}
        ]
    }
];