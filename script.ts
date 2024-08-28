interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
}

const quizData: QuizQuestion[] = [
  {
    question: "What does HTML stand for?",
    options: [
        "HighText Markup Language",
        "HyperText Marking Language",
        "HyperText Markup Language",
      "HyperText Main Language",
    ],
    answer: "HyperText Markup Language",
  },
  {
    question: "Which HTML element is used to specify a header for a document?",
    options: ["<header>", "<head>", "<h1>", "<heading>"],
    answer: "<header>",
  },
  {
    question: "What property is used to change the font size in CSS?",
    options: ["font-size", "text-size", "font-style", "text-style"],
    answer: "font-size",
  },
  {
    question: "How do you select an element with the id 'main' in CSS?",
    options: [".main", "#main", "main", "id:main"],
    answer: "#main",
  },
  {
    question:
      "Which HTML attribute specifies an alternate text for an image if the image cannot be displayed?",
    options: ["title", "src", "alt", "longdesc"],
    answer: "alt",
  },
  {
    question: "In CSS, how do you apply a style to all <p> elements?",
    options: ["p { style }", "p { ... }", ".p { ... }", "p: { ... }"],
    answer: "p { ... }",
  },
  {
    question: "Which JavaScript method is used to display an alert box?",
    options: ["prompt()", "console.log()", "alert()", "confirm()"],
    answer: "alert()",
  },
  {
    question: "How do you declare a variable in JavaScript?",
    options: ["var name;", "variable name;", "name = var;", "let name;"],
    answer: "let name;",
  },
  {
    question: "Which CSS property controls the text color?",
    options: [ "background-color", "font-color", "text-color","color"],
    answer: "color",
  },
  {
    question:
      "Which JavaScript method is used to parse a string as an integer?",
    options: ["toInteger()", "parseFloat()","parseInt()" , "convert()"],
    answer: "parseInt()",
  },
];

let currentQuestionIndex = 0;
let score = 0;

const startBtn = document.getElementById("start-btn") as HTMLButtonElement;
const quizSection = document.getElementById("quiz-section") as HTMLDivElement;
const resultSection = document.getElementById(
  "result-section"
) as HTMLDivElement;
const questionText = document.getElementById(
  "question-text"
) as HTMLHeadingElement;
const answersList = document.getElementById("answers-list") as HTMLDivElement;
const nextBtn = document.getElementById("next-btn") as HTMLButtonElement;
const resultsBtn = document.getElementById("results-btn") as HTMLButtonElement;
const scoreText = document.getElementById("score-text") as HTMLHeadingElement;
const retryBtn = document.getElementById("retry-btn") as HTMLButtonElement;

function startQuiz(): void {
  document.getElementById("start-section")!.classList.add("hidden");
  quizSection.classList.remove("hidden");
  resultSection.classList.add("hidden");
  currentQuestionIndex = 0;
  score = 0;
  displayQuestion();
}

function displayQuestion(): void {
  const question = quizData[currentQuestionIndex];
  questionText.innerText = question.question;
  answersList.innerHTML = "";
  question.options.forEach((option) => {
    const button = document.createElement("button") as HTMLButtonElement;
    button.innerText = option;
    button.addEventListener("click", () => handleAnswer(option, button));
    answersList.appendChild(button);
  });
}

function handleAnswer(selectedOption: string, button: HTMLButtonElement): void {
  const correctAnswer = quizData[currentQuestionIndex].answer;
  const buttons = answersList.querySelectorAll("button");

  buttons.forEach((btn) => {
    btn.disabled = true;
    if (btn.innerText === correctAnswer) {
      btn.classList.add("correct");
    } else if (btn === button) {
      btn.classList.add("wrong");
    }
  });

  if (selectedOption === correctAnswer) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("wrong");
  }

  if (currentQuestionIndex < quizData.length - 1) {
    nextBtn.classList.remove("hidden");
  } else {
    resultsBtn.classList.remove("hidden");
  }
}

function showResults(): void {
  quizSection.classList.add("hidden");
  resultSection.classList.remove("hidden");
  scoreText.innerText = `You scored ${score} out of ${quizData.length}`;
}

function nextQuestion(): void {
  currentQuestionIndex++;
  displayQuestion();
  nextBtn.classList.add("hidden");
  resultsBtn.classList.add("hidden");
}

function retryQuiz(): void {
  resultSection.classList.add("hidden");
  document.getElementById("start-section")!.classList.remove("hidden");
}

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
resultsBtn.addEventListener("click", showResults);
retryBtn.addEventListener("click", retryQuiz);
