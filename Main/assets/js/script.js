// Questions for Quiz

var questions = [
    {
        title: 'Commonly used data types DO NOT include:',
        choices: ['strings', 'booleans', 'alerts', 'numbers'],
        answer: 'alerts',
      },
      {
        title: 'The condition in an if / else statement is enclosed within ____.',
        choices: ['quotes', 'curly brackets', 'parentheses', 'square brackets'],
        answer: 'parentheses',
      },
      {
        title: 'Arrays in JavaScript can be used to store ____.',
        choices: [
          'numbers and strings',
          'other arrays',
          'booleans',
          'all of the above',
        ],
        answer: 'all of the above',
      },
      {
        title:
          'String values must be enclosed within ____ when being assigned to variables.',
        choices: ['commas', 'curly brackets', 'quotes', 'parentheses'],
        answer: 'quotes',
      },
      {
        title:
          'A very useful tool used during development and debugging for printing content to the debugger is:',
        choices: ['JavaScript', 'terminal / bash', 'for loops', 'console.log'],
        answer: 'console.log',
      },
]

// variables that'll keep track of th
var questionIndex = 0;
var time = questions.length * 15;
var timerId

// Variables that grab the DOM elements
var questionsEl = document.getElementById('questions');
var timerEl = document.getElementById('time');
var choicesEl = document.getElementById('choices');
var submitBtn = document.getElementById('submit');
var startBtn = document.getElementById('start');
var initialsEl = document.getElementById('initials');

// function that gets and changes questions
function getQuestion() {
    // grabs question object from questions array
    var currentQuestion = questions[questionIndex];
  
    // updates the question's title
    var titleEl = document.getElementById('question-title');

    titleEl.textContent = currentQuestion.title;
  
    // clear out any old question choices
    choicesEl.innerHTML = '';
  
    // loop over choices
    for (var i = 0; i < currentQuestion.choices.length; i++) {

      // create new button for each choice
      var choice = currentQuestion.choices[i];

      var choiceNode = document.createElement('button');

      choiceNode.setAttribute('class', 'choice');

      choiceNode.setAttribute('value', choice);
  
      choiceNode.textContent = i + 1 + '. ' + choice;
  
      // display on the page
      choicesEl.appendChild(choiceNode);
    }
  }

// function to start quiz
function startQuiz() {

    // hide the start screen
    var startScreenEl = document.getElementById('start-screen');

    startScreenEl.setAttribute('class', 'hide');

    // shows the questions
    questionsEl.removeAttribute('class');

    // starts the timer
    timerId = setInterval(clockTick, 1000);

    // displays starting time
    timerEl.textContent = time;
  
    getQuestion();
  }

  // function that'll end quiz
  function quizEnd() {
    // stops timer
    clearInterval(timerId);
  
    // show end screen
    var endScreenEl = document.getElementById('end-screen');
    endScreenEl.removeAttribute('class');
  
    // show final score
    var finalScoreEl = document.getElementById('final-score');
    finalScoreEl.textContent = time;
  
    // hide questions section
    questionsEl.setAttribute('class', 'hide');
  }
  
  // function that updates time 
  function clockTick() {
    // update time
    time--;
    timerEl.textContent = time;
  
    // check if user ran out of time
    if (time <= 0) {
      quizEnd();
    }
  }

  // Function for button clicks
  function questionClick(event) {
    var buttonEl = event.target;
  
    // if user clicks something that isn't a choice it'll do nothing
    if (!buttonEl.matches('.choice')) {
      return;
    }
  
    // check if user guessed wrong
    if (buttonEl.value !== questions[questionIndex].answer) {
      // penalize time
      time -= 15;
  
      if (time < 0) {
        time = 0;
      }
  
      // display new time on page
      timerEl.textContent = time;
  
      feedbackEl.textContent = 'Wrong!';
    } else {

      feedbackEl.textContent = 'Correct!';
    }
  
    // flash right/wrong feedback on page for half a second
    feedbackEl.setAttribute('class', 'feedback');
    setTimeout(function () {
      feedbackEl.setAttribute('class', 'feedback hide');
    }, 1000);
  
    // move to next question
    questionIndex++;
  
    // check if we've run out of questions
    if (time <= 0 || questionIndex === questions.length) {
      quizEnd();
    } else {
      getQuestion();
    }
  }

  function saveHighscore() {
    // get value of input box
    var initials = initialsEl.value.trim();
  
    // make sure value wasn't empty
    if (initials !== '') {
      // get saved scores from localstorage, or if not any, set to empty array
      var highscores =
        JSON.parse(window.localStorage.getItem('highscores')) || [];
  
      // format new score object for current user
      var newScore = {
        score: time,
        initials: initials,
      };
  
      // save to localstorage
      highscores.push(newScore);
      window.localStorage.setItem('highscores', JSON.stringify(highscores));
  
      // redirect to next page
      window.location.href = 'highscores.html';
    }
  }
  
  function printHighscores() {
    // either get scores from localstorage or set to empty array
    var highscores = JSON.parse(window.localStorage.getItem('highscores')) || [];
  
    // sort highscores by score property in descending order
    highscores.sort(function (a, b) {
      return b.score - a.score;
    });
  
    for (var i = 0; i < highscores.length; i += 1) {
      // create li tag for each high score
      var liTag = document.createElement('li');
      liTag.textContent = highscores[i].initials + ' - ' + highscores[i].score;
  
      // display on page
      var olEl = document.getElementById('highscores');
      olEl.appendChild(liTag);
    }
  }
  
  function clearHighscores() {
    window.localStorage.removeItem('highscores');
    window.location.reload();
  }
 
  

// makes begin button functional
startBtn.onclick = startQuiz;

// makes question button functional
choicesEl.onclick = questionClick;

// makes submit initials function
submitBtn.onclick = saveHighscore;
