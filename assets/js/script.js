//set quiz time length
let quizTime = 5;
let quizTimer;
//set initial question value
let questionValue = 0;
//pull all id's from index so we can start working on this quiz
let questionsSection = document.querySelector('#questions-section');
let questions = document.querySelector('#questions');
let answers = document.querySelector('#answers');
let timeRemaining = document.querySelector('#timeRemaining');
let timer = document.querySelector('#timer');
let scores = document.querySelector('#scores');
let start = document.querySelector('#startButton');
let submit = document.querySelector('#submitButton');
let feedback = document.querySelector('#feedback');
let highScore = document.querySelector('#high-Score')
let championScore = document.querySelector('#highscore-input')
let playerName = document.querySelector('#player-name')

//build array using 10 terrible and 1 very serious question
let theActualQuestionPart = [
    {
        prompt: 'What is the format called that is used for storing and transporting data?',
        choices: ['JSON', 'HTML', 'Syntax', 'Font'],
        answer: 'JSON'
    },
    {
        prompt: 'In JavaScript, what element is used to store multiple values in a single variable?',
        choices: ['Variables', 'Arrays', 'Strings', 'Functions'],
        answer: 'Arrays'
    },
    {
        prompt: 'What elements are used to test for TRUE or False values stored in variables?',
        choices: ['Trigger Readers', 'Regular Expressions', 'Conditional Statements', 'Comparison and Logical Operators'],
        answer: 'Comparison and Logical Operators'
    },
    {
        prompt: 'What is the element called that can continue to execute a block of code as long as the specified condition remains TRUE?',
        choices: ['Clone', 'Debugger', 'Repeater', 'Loop'],
        answer: 'Loop'
    },
    {
        prompt: 'What is the name of the statement that is used to exit or end a loop?',
        choices: ['Break Statement', 'Conditional Statement', 'Close Statement', 'Falter Statement'],
        answer: 'Break Statement'
    },
    {
        prompt: 'This is what you call the guide that defines coding conventions for all projects.',
        choices: ['Coding Dictionary', 'Main Textbook', 'Developer"s Reference', 'Style Guide'],
        answer: 'Style Guide'
    },
    {
        prompt: 'What are the identifiers called that cannot be used as variables or function names?',
        choices: ['Favorites', 'Constants', 'Concrete Terms', 'Reserved Words',],
        answer: 'Reserved Words'
    },
    {
        prompt: 'What kind of statement is used to execute actions based on a trigger or condition?',
        choices: ['Conditional Statement', 'Regular Expression', 'Fired Event', 'Boolean Value'],
        answer: ''
    },
    {
        prompt: 'In JavaScript, what is a block of code called that is used to perform a specific task?',
        choices: ['Function', 'String', 'Declaration', 'Variable'],
        answer: 'Function'
    },
    {
        prompt: 'What is considered to be the most popular programming language in the world?',
        choices: ['JavaScript', 'Swift', 'Ruby', 'HTML'],
        answer: 'JavaScript'
    },
    {
        prompt: 'Have You Seen the 2002 Action Adventure, "ClockStoppers" Starring International Sensation French Stewart?',
        choices: ['Yes of course', 'No but I am adding it to my Netflix list rn', 'Austin, how is this relevant'],
        answer: 'Yes of course'
    }
];
//start quiz function
let initiateQuiz = function() {
    let starterQuizInfo = document.querySelector('#starter');
    starterQuizInfo.setAttribute('class', 'hide');
    questionsSection.removeAttribute('class');
    //http://bit.ly/clockstoppersforlife
    quizTimer = setInterval(clockstoppersIsAnUnderratedMovie, 1000);
    timer.textContent = quizTime;
    showPlayerQuestions();
};
//set up function to display the questions stored in humongeous array
let showPlayerQuestions = function() {
    let questionArr = theActualQuestionPart[questionValue];
    questions.textContent = questionArr.prompt;
    answers.innerHTML = "";
    questionArr.choices.forEach(function(choices, i){
        let answerButton = document.createElement('button');
        answerButton.setAttribute('class', 'choice btn btn-outline-primary');
        answerButton.textContent = i + 1 + ". " + choices;
        answerButton.onClick = clickActions;
        answers.appendChild(answerButton);
    });
}
//set up function to handle user interaction
let clickActions = function() {
    if (this.value !== theActualQuestionPart[questionValue].answer) {
        quizTime -= 15;
        timer.textContent = quizTime;
        feedback.textContent = 'Wanna Try that Again There Bud?';
    } else {
        feedback.textContent = 'Oh You Betcha!';
    };
    feedback.setAttribute('class', 'feedback');
    lapseTime(function() {
        feedback.setAttribute('class', 'feedback hide');
    }, 1000);
    questionValue++;
    lapseTime( function(){
        if (questionValue === theActualQuestionPart.length) {
            quizConclusion();
        } else {
            showPlayerQuestions();
        };
    }, 1000);
};
//take a stand to declare a childhood favorite and while youre at it build a countdown timer.
let clockstoppersIsAnUnderratedMovie = function() {
    quizTime--;
    timer.textContent = quizTime;
    //when time hits 0 run function that stops quiz and hides elements
    if (quizTime <= 0) {
        quizConclusion();
    }
};
//create function to run after the quiz countdown completes
let quizConclusion = function() {
    clearInterval(quizTimer);
    questionsSection.setAttribute('class', 'hide');
    championScore.removeAttribute('class');
    highScore.textContent = quizTime;    
};
//create function for saving score after quiz completes
let initiateSave = function() {
    //setting name pulled from user input and giving them flattering name because im a nice guy
    let champion = playerName.value.toUpperCase().trim();
    //save user score to localStorage and display in outside userboard
    if (champion !== "") {
        //FUN FACT: setting up localStorage gives me acid reflux :D
        let highScores = JSON.parse(window.localStorage.getItem('highscores')) || [];
        playerScore = {
            score: quizTime,
            intials: playerName
        };
        highScores.push(playerScore);
        window.localStorage.setItem('playerScore', JSON.stringify(playerScore));
        window.location.href = 'leaderboard.html';
        window.location.reload();
    }
    //if youre reading this, reply with 'DRINK MORE OVALTINE' when you grade my code
};
//listeners for submit and start buttons
start.onclick = initiateQuiz;
submit.onclick = initiateSave;