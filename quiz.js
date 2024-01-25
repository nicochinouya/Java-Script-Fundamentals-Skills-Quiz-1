const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const progressBarFull = document.getElementById('progressBarFull');
const game = document.getElementById('game');
const loader = document.getElementById('loader');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let Questions = [
    {
        question: "What is the correct way to declare a variable in JavaScript?",
        choice1: "<variable x>",
        choice2: "<var x>",
        choice3: "<int x>",
        choice4: "<x = var>",
        answer: 2
    },
    {
        question: "Which of the following is NOT a valid data type in JavaScript?",
        choice1: "<string>",
        choice2: "<boolean>",
        choice3: "<float>",
        choice4: "<array>",
        answer: 3
    },
    {
        question: "What does the `===` operator do in JavaScript?",
        choice1: "Checks for equality and type",
        choice2: "Checks for equality only",
        choice3: "Assigns a value",
        choice4: "Checks for type only",
        answer: 1
    },
    {
        question: "How do you comment out multiple lines in JavaScript?",
        choice1: "// This is a comment",
        choice2: "/* This is a comment */",
        choice3: "<!-- This is a comment -->",
        choice4: "# This is a comment",
        answer: 2
    }
];

//constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 4;

const startquiz = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...Questions];
    getNewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden');
};

const getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign('/end.html');
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerHTML = currentQuestion.question;

    choices.forEach((choice, index) => {
        choice.innerHTML = currentQuestion['choice' + (index + 1)];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

const incrementScore = num => {
    score += num;
};
